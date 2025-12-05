export interface Customer {
  id: number;
  customerId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  zip?: string;
  city?: string;
  notes?: string;
}