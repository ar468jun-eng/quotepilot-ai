/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Receipt,
  FileText,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Users
} from 'lucide-react';
import { ScreenType } from '../types';
import { MOCK_ACTIVITY, MOCK_TOP_CUSTOMERS_DASHBOARD } from '../data';

interface DashboardViewProps {
  setScreen: (screen: ScreenType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setScreen }) => {
  const [selectedRange, setSelectedRange] = useState<'30days' | '90days' | '12months'>('30days');

  // Sparklines representation
  const renderSparkline = (color: string) => (
    <svg className="w-20 h-8 shrink-0 opacity-70" viewBox="0 0 100 30">
      <path
        d="M0,25 Q15,10 30,20 T60,5 T90,15 L100,10"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="space-y-6">
      
      {/* Dynamic Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            id: 'stat-quotes',
            label: 'Total Quotations',
            value: '1,284',
            change: '+12.5%',
            positive: true,
            icon: FileText,
            color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/40',
            sparkColor: '#4f46e5'
          },
          {
            id: 'stat-invoices',
            label: 'Invoices Issued',
            value: '856',
            change: '+8.2%',
            positive: true,
            icon: Receipt,
            color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-100 dark:border-violet-900/40',
            sparkColor: '#7c3aed'
          },
          {
            id: 'stat-revenue',
            label: 'Total Revenue (₹)',
            value: '₹12.4 Lakh',
            change: '+18.4%',
            positive: true,
            icon: DollarSign,
            color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40',
            sparkColor: '#10b981'
          },
          {
            id: 'stat-pending',
            label: 'Pending Payments',
            value: '₹2.8 Lakh',
            change: '-2.1%',
            positive: true, // Improvement
            icon: Clock,
            color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/40',
            sparkColor: '#f59e0b'
          }
        ].map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            id={card.id}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm flex items-start justify-between relative group hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {card.label}
              </span>
              <p className="font-display font-bold text-2xl text-slate-800 dark:text-white">
                {card.value}
              </p>
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`font-semibold font-mono px-1.5 py-0.5 rounded ${
                  card.positive ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30'
                }`}>
                  {card.change}
                </span>
                <span className="text-slate-400 text-[10px]">vs last month</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 justify-between h-full">
              <div className={`p-2.5 rounded-xl border ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              {renderSparkline(card.sparkColor)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Pipeline Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Trend Chart (Custom Premium SVG Area Chart) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Sales Pipeline & Conversion Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Performance matrix for corporate quotation closures
              </p>
            </div>

            <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-900">
              {(['30days', '90days', '12months'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedRange === range
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {range === '30days' ? '30 Days' : range === '90days' ? '90 Days' : '12 Months'}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Customizable SVG Area Chart */}
          <div id="dashboard-trend-chart" className="relative h-64 w-full flex flex-col justify-between pt-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[1, 2, 3, 4].map((gridLine) => (
                <div key={gridLine} className="w-full border-t border-slate-100 dark:border-slate-800/80" />
              ))}
            </div>

            <div className="relative w-full h-48 mt-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id="chartGradientBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="chartGradientViolet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Sub-grid lines */}
                <line x1="100" y1="0" x2="100" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                <line x1="200" y1="0" x2="200" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                <line x1="300" y1="0" x2="300" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                <line x1="400" y1="0" x2="400" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                <line x1="500" y1="0" x2="500" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />

                {/* Area Gradient 1 (Quotes generated) */}
                <path
                  d="M0,160 Q100,110 200,130 T400,60 T600,40 L600,200 L0,200 Z"
                  fill="url(#chartGradientBlue)"
                />

                {/* Line 1 */}
                <path
                  d="M0,160 Q100,110 200,130 T400,60 T600,40"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Area Gradient 2 (Quotes closed/paid) */}
                <path
                  d="M0,180 Q100,140 200,150 T400,90 T600,65 L600,200 L0,200 Z"
                  fill="url(#chartGradientViolet)"
                />

                {/* Line 2 */}
                <path
                  d="M0,180 Q100,140 200,150 T400,90 T600,65"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="4 2"
                />

                {/* Dot Highlights */}
                <circle cx="400" cy="60" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="600" cy="40" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                <circle cx="400" cy="90" r="5" fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            {/* X-Axis labels */}
            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 px-1 pt-2">
              <span>WK 27</span>
              <span>WK 28</span>
              <span>WK 29</span>
              <span>WK 30</span>
              <span>WK 31 (ACTIVE)</span>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2 border-t border-slate-50 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
              <span>Quotes Generated (₹8.4L volume)</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-violet-500 shrink-0 border border-dashed border-white" />
              <span>Invoiced Closed (₹4.2L settled)</span>
            </div>
          </div>
        </div>

        {/* Quick Launchpad & Stats */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Launch Control
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Trigger workspace actions immediately
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                id="dashboard-btn-create-quote"
                onClick={() => setScreen('quotation_generator')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all text-sm group shadow-md shadow-blue-500/10"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
                  <span>AI Quotation Generator</span>
                </div>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                id="dashboard-btn-create-invoice"
                onClick={() => setScreen('invoices')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4 text-violet-500" />
                  <span>Manage Invoices</span>
                </div>
                <Plus className="w-4 h-4" />
              </button>

              <button
                id="dashboard-btn-add-customer"
                onClick={() => setScreen('customers')}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all text-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-emerald-500" />
                  <span>Add New Customer</span>
                </div>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Conversion Efficiency
            </p>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">Quote-to-Paid Ratio</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono">68.5%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '68.5%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section: Top Performing Customers & Live Pipeline Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Performing Customers */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Top Client Pipeline
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Highest value closures this billing cycle
              </p>
            </div>
            <button
              onClick={() => setScreen('customers')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore Database</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div id="dashboard-top-customers-table" className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Client Partner</th>
                  <th className="pb-3 font-semibold">Quote Volume</th>
                  <th className="pb-3 font-semibold text-right">Settled Business</th>
                  <th className="pb-3 font-semibold text-right">Pipeline Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {MOCK_TOP_CUSTOMERS_DASHBOARD.map((customer, index) => (
                  <tr key={index} className="text-xs group hover:bg-slate-50/55 dark:hover:bg-slate-950/20">
                    <td className="py-3.5 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/20 font-mono text-xs">
                        {customer.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          {customer.company}
                        </p>
                        <p className="text-[10px] text-slate-400">Corporate Account</p>
                      </div>
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300 font-medium">
                      {customer.quotes} Active Proposals
                    </td>
                    <td className="py-3.5 text-right font-bold text-slate-900 dark:text-slate-100 font-mono">
                      {customer.amount}
                    </td>
                    <td className="py-3.5 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        customer.status === 'Paid'
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          customer.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Pipeline Log */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Recent Workspace Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live actions across the workspace
            </p>
          </div>

          <div id="dashboard-activity-feed" className="space-y-4">
            {MOCK_ACTIVITY.map((activity) => (
              <div key={activity.id} className="flex gap-3 text-xs">
                <div className="mt-0.5 shrink-0">
                  {activity.type === 'paid' && (
                    <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                  {activity.type === 'quote_sent' && (
                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20">
                      <FileText className="w-4 h-4" />
                    </div>
                  )}
                  {activity.type === 'draft' && (
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                  )}
                  {activity.type === 'overdue' && (
                    <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {activity.title}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {activity.details}
                  </p>
                </div>

                <div className="text-[10px] text-slate-400 font-mono text-right shrink-0">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
