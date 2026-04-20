export type * from './auth';

import type { Auth } from './auth';

export type TenantStatus = 'pending' | 'active' | 'inactive';

export interface Plan {
    id: number;
    name: string;
    type: 'basic' | 'premium';
    description: string;
    price: number;
    status: 'active' | 'archived';
    is_featured: boolean;
    features: {
        max_imports_per_day: number | null;
        max_users: number | null;
        max_exports_per_day: number | null;
    } | null;
}

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};
