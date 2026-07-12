/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Customer, Product, Invoice, ActivityItem, TeamMember } from './types';

export const USER_PROFILES = {
  arjun: {
    name: 'Arjun Sharma',
    role: 'Owner',
    tier: 'Premium SaaS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlChXWWeqodOrH8c3LispktMFz6LLenHb0-0t0b1b51PBhjJ1SDoTE8x5e5xwAd-G2WsGBgx_QU-xjgMIpABm346taQZlBpy3K3TQ6o9qQAy8KYsdpppQLppY40Vy4UTwsID4PLYv-mB6Qe0LU6Ub08O7AYIM6vRi2EGyFxSuK943WPcqncbuLV9o9xhOxO-UXi9EpYLLtMcnSxV6bfuwoVOmz_tkVxWtWUUKh6Afm9En7EWD9PrC9eD6WPNU8pdnP9zVNpejFUIw'
  },
  arjun_admin: {
    name: 'Arjun Sharma',
    role: 'Administrator',
    tier: 'Premium SaaS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU255PN3RWyyRFUNqLsaH82a7xt2bSglP7mXCL4Uefnm9fgIbnJqNNrcNqvU331x24JF0o3xP-AI_vEvyr6KSeTfHC_wprlCL98ULXlBVZudKAbAvdDNePyzfoMQvD_y0xRD0QtQk_ng76vKxI78MkeqdXcHRNFOj3Og10ptwW8QDjnIaoPo-MLxFcmX5OeR5lY0smSs-HBRkGCFeJURNb_iPeOGmqr6CyrCGjnIJYqIuGaVZZOnHUYZlpD6JPqW73zvYVxSAocLg'
  },
  alex: {
    name: 'Alex Chen',
    role: 'Premium Plan',
    tier: 'Premium Plan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtL8Nc3FfKiKBrUkMosB5R8igL0mv68AcporWR4Ka3JdKVlnvT-gnYXJeMoT8aAFSKkr6P6reHVLbDmAnkfbGt7T963DvjtEsPOhnUK0IhvgaZHcVrxsiFGko-nue9-SspG7O9m6IMllgQqBwT3ioeGIWI5ELMUKBpjBu7rgM_5IHeRSCItIxA5Yu48R4fqeI4ypdWtDXBXnLtRKmBqzCZLYiJaQL2WML-Y4XFJ5OCrfa6yOVyeqzV5Qs2f-R_-egvaRMxjXBJP5g'
  },
  owner_pro: {
    name: 'Business Owner',
    role: 'Pro Account',
    tier: 'Premium SaaS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgGaKW6BzNRUrt-IyxxGHTc4Hec6mCuPBBsyO_5oJ7wnaupwtsZjCwMhQaklYEi07S9eTdWQxoinNF5p6eE1yzogs6PmW-UqYqe9SHiGb-J-2G-U-7rhK7SOraRbyXXuKzqeXJMmsQkTZtfxCXQc-R3sDHBv3R00QYlJw8EB-29D5Se3_RkqHJDrhWsar5cVe-SEy0GXiVgatL2pX-ZfzP0javJc7IC5R8xLW6wK6aJxUhpRrHwPOLXv9JiZvWIHpPaWHUvgNDfi0'
  },
  mehta: {
    name: 'Arjun Mehta',
    role: 'Premium Tier',
    tier: 'Premium Tier',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHY0bmstjOWHfD20DfdCYBkdA3wY0FY_Ig9z_6Irl9eBSlLZXkry60lCQEJxTiZI6cfzMO3cwYPVPeHLsfRv_2YXMTVNG7GnWgG1C-34qbzG9qCdptctqKu-C6s_9v0VY9yl-k3pPJNZQzJWmZpDpFCSAbHsOPQ9tAa-nfOh1NOGGh7gxnlkIPbfvGVJoBCVPJ1wAUHGhUdMhllln2_bl7n9qQrp7bbp7REaTU9nE-Ys7t83F-jgDOyQYWNjzeXAhc6J8uQZBP8zE'
  },
  owner_admin: {
    name: 'Business Owner',
    role: 'Admin Account',
    tier: 'Premium SaaS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNL9mLmgKCJzm3fU02Ln_mIMJe-KFfEKT_VkRASw6u449TurhbpNCYLRUr4fXErfh9Zy2_uhqJb5nOOthrAJHVUiJM-wJ68pYgEd5bacOaniyvoRgcun_e5Gex0_TID00tLUpo8Q6LGyuhtPPXQdWYgj6he4TmlgkpP-UXo-NfsK73vWh7Uiyz5jIxHix6Tx-k-osFvVjuyorYZspx3xN-M_8eN8T_zGL6bMOEYRiDAm4A_R5w-LgGeUvg0ytG1AINdA6ZpdUdRyk'
  },
  rajiv: {
    name: 'Rajiv Mehta',
    role: 'Admin Account',
    tier: 'Premium SaaS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhVz5HNYdfXYLDy5BUXUNH7xZQWcMB_TyQLwOUFnbXlbD-8AFUaJw1E0ZURFZJSSYxsX_4ocEhug3oHDHhuJ7CocC4hQpWj6vTe_ASb-js1Q-uAqszCczaOnUfx3SkovJDLXVWKn_T2tUmy2zr-4rka_ib04PEHbjCm0lNJ46Z6hFyyUsEAwptMk-84PP9p3X73Z3QoGx6OybBCsNxQ21q-xwSNRO4dKlfFYwjcPIZ6VUUr0Oi-Ihqj8p6_SqHLQpo877GQzY3Y7M'
  },
  admin_panel: {
    name: 'Admin Panel',
    role: 'Enterprise Plan',
    tier: 'Premium SaaS',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwjWOR7VMOLOfdaGfPTGB_gyAdXHAEuwpgQadYODPIYVf43BD0Lzre55EWTrfvgiIMOJaYKb7OfUQhEpJXtRjZfbaM720J2mND-hdTEm3S1upozdili14wDnbKfVuajTiT83k-Fz3KO3hrjrU0ZU7qGUSZ70qDOMdeXM9G6jv_xH1xoi7pZkDXhB93eewM3W7oBvbzbGA_mv1fvtmn07i_aweVxqQ_N2QPrf7i-XSk5UcNl0jQlq2AtP_hrJgG2Nk_oE-4eIhgOj8'
  }
};

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-101',
    name: 'Aryan Sharma',
    company: 'TechNexus Solutions',
    phone: '+91 98765-43210',
    email: 'aryan@technexus.com',
    totalBusiness: 1245000,
    initials: 'AS',
    status: 'active',
    growth: true
  },
  {
    id: 'CUST-102',
    name: 'Priya Kapoor',
    company: 'Bloom Decor Int.',
    phone: '+91 91234-56789',
    email: 'priya.k@bloom.in',
    totalBusiness: 892500,
    initials: 'PK',
    status: 'active',
    growth: true
  },
  {
    id: 'CUST-103',
    name: 'Vikram Khanna',
    company: 'Khanna Logistics',
    phone: '+91 99887-76655',
    email: 'v.khanna@logistics.co',
    totalBusiness: 510000,
    initials: 'VK',
    status: 'active',
    growth: false
  },
  {
    id: 'CUST-104',
    name: 'Ananya Das',
    company: 'Studio Pixel',
    phone: '+91 88776-55443',
    email: 'das.ananya@studio.com',
    totalBusiness: 1820000,
    initials: 'AD',
    status: 'active',
    growth: true
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    sku: 'FUR-ERGO-091',
    name: 'ErgoStream Z-Alpha Chair',
    price: 24499,
    taxGst: 18,
    hsn: '9403',
    stock: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB23b8sURTUchSCByGSgy7sOtfLN0KTyd3lMNy04Tdi-zTVtGzFuqHtyy9wZySL1fbthk6qv2FUSTOehizfRIsR323PvTz9tuJb3cSchnOObqHXyugsqRGgRvlalC2xb6D_2F69duJLhCiA6LSJcJ8V3RoE_zkYhXiQuFOBbq6-ribyzoeYgH0MK9S1pebPs70HR0zYklZT5fGGgQM7Blzz1-CNKM3DIr5khtc0RCxWGFAhG-1vwrDdp2_h3O4_g44iVBJ6_C2IDvA'
  },
  {
    sku: 'AUD-HEAD-821',
    name: 'SonicWave Pro Max X1',
    price: 18990,
    taxGst: 12,
    hsn: '8518',
    stock: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzqK5FHsmZ3h8P92rxg8QWvBfNmmcq-bCW_3_pYeon557QBTJlAaZzfnU8WkteBh6QD0kMKSADs6QKJVZZ-N3yLCBSN-b95P5HUYiR1GzbTgscC5duDj7oNYJcggXEYoAVzekmMUjHWHX0ZvCAjtJpCZ7c_pRpBOWufaPk2rWHdlhEF9oqA0RuwFMSxt2ifDzpdAyz4SykyIZVzc-eK8_Vppe4oatJvXlQ0mUT8kROBBwn2SlJRG_Ozf7Oqa9pNvZJ_fVi1w4rLvM'
  },
  {
    sku: 'PER-KEYB-223',
    name: 'KeyNexus 80% Mechanical',
    price: 8500,
    taxGst: 18,
    hsn: '8471',
    stock: 156,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCAMwdnGviom6CSeLL7XTEWYBUww2ygKBTQYuYq06xgzAmVQJdYSsmkZE6TPnhaFQIbCvmYsHTvyIoLs63TVxmlHRh95HxQwR3BO1f6wk8fnjJgdCWIrOPunfk2o67Vj1hrWrmqyoR3wg4x4c9n81dZ-Vcm3Gez-n3m68fQjJk5udUgWODXPuekLs29q0F0gPT77MjwtDMxA6xjFyunn5AStXOt8J8Ekhu8hcaYA9gvILqueVLejqC9-f1hBb4CGkQSzBwxAAJv2s'
  },
  {
    sku: 'DIS-MON-554',
    name: 'VisionCore 32" 4K Display',
    price: 45000,
    taxGst: 18,
    hsn: '8528',
    stock: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb1JyR6YeP2hajeLpD1HtL1eJXNB5xorTkrjbA_cZPf5rQPaeGipzLqmaqlw4UOSUtryXJaUQHecFNBhyFz-43yPm29ViWlmbY8TfjifUydqCK_anZgqkW4kpJp6NHgXfRWF2QtlE1FseENE_ugbrugaUzSJxnhwicH6y04Oh2FLncMr22mpq7pByfztYF5WNSLavBri8bCGJNwwHIsVvzGkwvlE9qnL5TsJBQETBzV3QXPigz1VCq-mLT_lah_zyUMzpDc9KbUY4'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: '#INV-2024-001',
    clientName: 'Stellar Labs Inc.',
    status: 'Pending',
    dueDate: 'Oct 24, 2024',
    issueDate: 'Oct 14, 2024',
    amount: 4250.0,
    email: 'accounts@stellarlabs.co',
    billingAddress: '888 Galaxy Way, Building 12, Austin, TX 78701',
    description: 'Enterprise SaaS Subscription & Onboarding Services',
    items: [
      {
        description: 'Enterprise SaaS Subscription',
        details: 'Annual license for 50 users with advanced AI analytics.',
        qty: 1,
        unitPrice: 3500.0
      },
      {
        description: 'Setup & Onboarding',
        details: 'One-time implementation fee for custom workflows.',
        qty: 1,
        unitPrice: 750.0
      }
    ]
  },
  {
    id: '#INV-2023-994',
    clientName: 'Nova Digital',
    status: 'Paid',
    dueDate: 'Nov 12, 2024',
    issueDate: 'Oct 12, 2024',
    amount: 1890.0,
    email: 'billing@novadigital.io',
    billingAddress: '423 Silicon Parkway, Building 2, San Jose, CA 95110',
    description: 'Standard SaaS Subscription',
    items: [
      {
        description: 'Standard SaaS License',
        details: 'Monthly billing for 20 seats.',
        qty: 3,
        unitPrice: 630.0
      }
    ]
  },
  {
    id: '#INV-2023-990',
    clientName: 'Azure Systems',
    status: 'Overdue',
    dueDate: 'Sep 28, 2024',
    issueDate: 'Aug 28, 2024',
    amount: 12400.0,
    email: 'accounts@azuresystems.com',
    billingAddress: '100 Skyview Tower, Seattle, WA 98101',
    description: 'Custom Platform Integration Fee',
    items: [
      {
        description: 'Platform Integration Support',
        details: 'Professional services for dedicated hosting integration.',
        qty: 1,
        unitPrice: 12400.0
      }
    ]
  },
  {
    id: '#INV-2023-988',
    clientName: 'Cloud Nine Media',
    status: 'Paid',
    dueDate: 'Oct 20, 2024',
    issueDate: 'Oct 05, 2024',
    amount: 3120.0,
    email: 'finance@cloud9.media',
    billingAddress: '77 Broad Street, Floor 14, New York, NY 10004',
    description: 'Creative Agency Monthly Subscription',
    items: [
      {
        description: 'Creative Suite License',
        details: 'Monthly seat allocation for designers.',
        qty: 1,
        unitPrice: 3120.0
      }
    ]
  },
  {
    id: '#INV-2023-985',
    clientName: 'Peak Performance',
    status: 'Pending',
    dueDate: 'Oct 30, 2024',
    issueDate: 'Oct 10, 2024',
    amount: 750.0,
    email: 'accounts@peakperformance.fit',
    billingAddress: '55 Gym Road, Fitness Park, Boulder, CO 80301',
    description: 'Growth Plan Subscription Upgrade',
    items: [
      {
        description: 'Growth Subscription Upgrade',
        details: 'Plan modification upgrade to support automated lead channels.',
        qty: 1,
        unitPrice: 750.0
      }
    ]
  }
];

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'ACT-001',
    type: 'paid',
    title: 'Invoice Paid: INV-8291',
    details: 'TechFlow Solutions • ₹42,500',
    time: '2 hours ago'
  },
  {
    id: 'ACT-002',
    type: 'quote_sent',
    title: 'Quote Sent: QT-1022',
    details: 'Skyline Architects • ₹1,20,000',
    time: '5 hours ago'
  },
  {
    id: 'ACT-003',
    type: 'draft',
    title: 'Draft Created: QT-1023',
    details: 'Global Logistics Inc.',
    time: 'Yesterday'
  },
  {
    id: 'ACT-004',
    type: 'overdue',
    title: 'Payment Overdue',
    details: 'Design Studio X • ₹18,000',
    time: '2 days ago'
  }
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'TEAM-01',
    name: 'Ananya Kulkarni',
    email: 'ananya@quantumdynamics.in',
    role: 'Owner',
    initials: 'AK'
  },
  {
    id: 'TEAM-02',
    name: 'Rahul Sharma',
    email: 'rahul@quantumdynamics.in',
    role: 'Manager',
    initials: 'RS'
  }
];

export const MOCK_TOP_CUSTOMERS_DASHBOARD = [
  {
    company: 'TechFlow Solutions',
    quotes: 12,
    amount: '₹4,25,000',
    status: 'Paid',
    initials: 'TF'
  },
  {
    company: 'Skyline Architects',
    quotes: 8,
    amount: '₹3,10,000',
    status: 'Paid',
    initials: 'SA'
  },
  {
    company: 'Global Logistics',
    quotes: 5,
    amount: '₹1,85,000',
    status: 'Pending',
    initials: 'GL'
  }
];
