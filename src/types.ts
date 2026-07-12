/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenType =
  | 'login'
  | 'dashboard'
  | 'customers'
  | 'products'
  | 'quotation_generator'
  | 'quotation_details'
  | 'invoices'
  | 'reports'
  | 'settings'
  | 'ai_assistant';

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  totalBusiness: number;
  initials: string;
  status: 'active' | 'inactive';
  growth: boolean;
}

export interface Product {
  sku: string;
  name: string;
  price: number;
  taxGst: number;
  hsn: string;
  stock: number;
  image: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  status: 'Pending' | 'Paid' | 'Overdue';
  dueDate: string;
  issueDate: string;
  amount: number;
  billingAddress: string;
  email: string;
  description: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  details: string;
  qty: number;
  unitPrice: number;
}

export interface ActivityItem {
  id: string;
  type: 'paid' | 'quote_sent' | 'draft' | 'overdue';
  title: string;
  details: string;
  time: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Admin';
  initials: string;
}
