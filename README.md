# SAMS — Student Attendance Management System

> A multi-tenant SaaS platform that lets student organizations manage events, track attendance, record payments, and control member access — all from one centralized system with strict per-organization data isolation.

---

## Key Features

### Multi-Tenancy

- Each organization (tenant) gets its **own isolated MySQL database** (`tenant_{id}`)
- Tenant workspaces are provisioned automatically on sign-up — no manual setup needed
- Strict subdomain-based routing: `http://{org-slug}.{APP_DOMAIN}` (e.g. `http://sbo.localhost`)
- Central admin manages all orgs from a separate domain/dashboard

### Subscription Plans

- **Semester-based billing** (5-month access, priced at ₱1,199)
- Two tiers: **Basic** and **Premium**
  - Basic — manual/barcode attendance, up to 400 student imports (1-day cooldown), 3 admin accounts, 3 export credits
  - Premium — unlimited imports, customizable UI + branding, unlimited exports, full RBAC, unlimited admins
- Plan limits are enforced at the middleware and controller layer
- Payments processed via **PayMongo** API; successful payments auto-provision the tenant

### Attendance Flow

1. Admin creates an **Event** (e.g. "JS101 Seminar")
2. Event is split into one or more **Sessions** (e.g. AM / PM)
3. Session lifecycle is controlled explicitly: `Start → Pause → Resume → End`
4. Officers record attendance per-session via **manual entry** or **barcode/QR scan**
5. Attendance is validated against the **Student Masterlist** in real time
6. After the event, attendance data can be **exported** as Excel/CSV

### Student Masterlist Manager

- Bulk import via **CSV/Excel** with a preview step before committing
- Individual CRUD for student records
- Each student has: `student_id`, `first_name`, `last_name`, `section`, `year`

### Collections & Transactions (Finance)

- Orgs define **Collections** (payment categories, e.g. "T-Shirt Fee") with custom detail fields
- **Transactions** are 1:1 per student per collection; partial payments are supported via `TransactionPayment` records
- Recording a payment on an already-existing transaction appends a new payment event rather than creating a duplicate
- Status automatically computed: `pending → partial → paid`

### Role-Based Access Control (RBAC)

- Fully customizable roles per organization
- 30+ granular permissions across modules: Dashboard, Events, Attendance, Masterlist, Collections, Transactions, Users, Roles, Settings, Support, System
- Permissions enforced server-side via `CheckPermission` middleware and surfaced client-side via Inertia shared props

### Additional

- **In-app Support Ticketing** — tenants raise tickets from their dashboard; central admin responds from a unified queue
- **System Updates** — tenants can check for, apply, and roll back platform updates
- **Branding & Theming** — Premium orgs can upload a logo and customize the UI color scheme and sidebar layout

---

## Tech Stack

| Layer              | Technology                                      |
| ------------------ | ----------------------------------------------- |
| Backend            | PHP 8.4 · Laravel 12                            |
| Frontend           | React 19 · Inertia.js v2 · TypeScript           |
| Styling            | Tailwind CSS v4                                 |
| Multi-tenancy      | `stancl/tenancy` v3                             |
| ORM                | Eloquent (Laravel)                              |
| Routing (Frontend) | Laravel Wayfinder v0                            |
| Build Tool         | Vite                                            |
| Testing            | Pest v4 · PHPUnit v12                           |
| Payments           | PayMongo API                                    |
| Email              | Gmail SMTP (via Laravel Mailer)                 |
| PDF/Excel Export   | `barryvdh/laravel-dompdf` · `maatwebsite/excel` |

---

## Local Setup

### Prerequisites

- PHP 8.4+
- Composer
- Node.js 20+
- MySQL (central DB + per-tenant DBs)
- A wildcard local DNS entry — e.g. `*.localhost` resolving to `127.0.0.1`
  - On most systems `*.localhost` works out of the box in browsers; if not, use a tool like [dnsmasq](https://thekelleys.org.uk/dnsmasq/doc.html) or add manual entries in `/etc/hosts`

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/your-org/sams.git
cd sams

# 2. Install PHP dependencies
composer install

# 3. Set up environment
cp .env.example .env
php artisan key:generate
```

**Configure `.env` for MySQL and your domain:**

```env
APP_URL=http://localhost
APP_DOMAIN=localhost          # Tenants resolve as {slug}.localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sams              # Central database
DB_USERNAME=root
DB_PASSWORD=

PAYMONGO_SECRET=sk_test_...   # Optional for local dev
```

```bash
# 4. Run central database migrations and seed default plans/admin
php artisan migrate
php artisan db:seed

# 5. Install frontend dependencies and build assets
npm install
npm run build

# 6. Start the development server (PHP + queue + Vite in one command)
composer run dev
```

The central app is now at `http://localhost`.
A demo tenant workspace is at `http://sbo.localhost` (created by the seeder).

### Recreating Tenant-Side Data

After running `php artisan tenants:migrate-fresh` (which wipes all tenant databases), recreate the tenant user via Tinker:

```bash
php artisan db:seed         # Recreates central plan, admin, and tenant record
php artisan tinker
```

```php
tenancy()->initialize(Tenant::find('sbo'));
User::create([
    'name'      => 'Admin',
    'email'     => 'admin@sbo.test',
    'password'  => bcrypt('password'),
    'tenant_id' => 'sbo',
]);
```

> [!WARNING]
> `php artisan tenants:migrate-fresh` **destroys all tenant databases**. Never run it in production.

---

## How Tenant Isolation Works

SAMS uses **database-per-tenant isolation** via [`stancl/tenancy`](https://tenancyforlaravel.com/).

### The Two-Database Model

| Database                        | What it stores                                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Central DB** (`sams`)         | `tenants`, `domains`, `plans`, central `users`, global settings, support queue                                             |
| **Tenant DB** (`tenant_{slug}`) | `students`, `events`, `sessions`, `attendance_records`, `users`, `roles`, `collections`, `transactions`, `tenant_settings` |

Every tenant gets a fully separate MySQL database. No foreign keys, no shared tables, no row-level filtering — the databases are physically separate.

### How a Request is Routed

```
Browser hits: http://sbo.localhost/events
         │
         ▼
InitializeTenancyBySubdomain middleware
  → Reads subdomain "sbo"
  → Looks up Tenant record in central DB
  → Calls tenancy()->initialize($tenant)
  → Swaps the active DB connection to tenant_{sbo}
         │
         ▼
All subsequent Eloquent queries hit tenant_sbo DB
         │
         ▼
CheckPermission middleware validates the user's RBAC permissions
         │
         ▼
Controller runs → Inertia renders React page
```

### Key Files

| File                                                                                   | Role                                                                                                |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`app/Providers/TenancyServiceProvider.php`](app/Providers/TenancyServiceProvider.php) | Registers tenancy events (auto-creates/migrates/deletes tenant DBs on tenant lifecycle)             |
| [`routes/tenant.php`](routes/tenant.php)                                               | All tenant-scoped routes; protected by `InitializeTenancyByDomain` and `CheckPermission` middleware |
| [`routes/web.php`](routes/web.php)                                                     | Central/admin routes only                                                                           |
| [`database/migrations/tenant/`](database/migrations/tenant/)                           | Migrations run against each tenant's own DB                                                         |
| [`app/Http/Middleware/`](app/Http/Middleware/)                                         | Includes `CheckPermission` for per-route RBAC enforcement                                           |

### Automatic Provisioning

When a new tenant is created (after a successful PayMongo payment), `TenancyServiceProvider` fires a `TenantCreated` event that runs a job pipeline:

```
TenantCreated
  → CreateDatabase   (creates tenant_{id} in MySQL)
  → MigrateDatabase  (runs all /migrations/tenant/ files against it)
```

The tenant's workspace is fully ready without any manual DBA work.

### Why This Matters

- **No data leakage between orgs** — a bug in Org A's code cannot read Org B's data because the DB connection itself is different
- **Independent schema evolution** — you can migrate one tenant at a time
- **Scalable** — tenants can eventually be moved to different DB servers without application changes
- **Audit-friendly** — the central DB is the single source of truth for billing, plans, and org status; tenant DBs are operational data only

---

## Project Structure (Key Paths)

```
app/
├── Enums/Permission.php          # All 30+ permission constants + grouped() helper
├── Http/Controllers/
│   ├── Tenant/                   # All tenant-scoped controllers
│   └── Admin/                    # Central admin controllers
├── Models/                       # Eloquent models (shared namespace, context-aware)
├── Providers/TenancyServiceProvider.php
routes/
├── web.php                       # Central routes
├── tenant.php                    # Tenant routes (auto-loaded by TenancyServiceProvider)
database/
├── migrations/                   # Central DB migrations
└── migrations/tenant/            # Tenant DB migrations
resources/js/
├── pages/tenant/                 # Inertia React pages (tenant app)
├── pages/                        # Central/landing pages
└── components/                   # Shared UI components
```
