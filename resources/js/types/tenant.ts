export type Tenant = {
  id: string;
  organization_name: string;
  organization_type: string;
  plan: string;
  status: string;
  domain: string | null;
  address: string | null;
  name: string | null;
  email: string | null;
  created_at: string;
};
