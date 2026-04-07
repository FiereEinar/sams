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
}

export type SharedData = {
    name: string;
    auth: Auth;
    [key: string]: unknown;
};
