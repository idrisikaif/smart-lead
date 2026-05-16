export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdBy: string;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  pagination: PaginationMeta;
}