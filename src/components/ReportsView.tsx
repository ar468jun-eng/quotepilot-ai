/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Download,
  Award,
  Globe,
  PieChart,
  Zap,
  Target,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = useState<'q3' | 'q4' | 'annual'>('q3');

  return (
    <div className="space-y-6">
      
      {/* Visual Analytics KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            label: 'Total Realized Revenue',
            value: '₹12,45,000',
            desc: 'Consolidated commercial cash ledger',
            change: '+18.4%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/30'
          },
          {
            label: 'Active Pipeline Proposals',
            value: '₹4,80,000',
            desc: 'Outstanding open quotations',
            change: '+11.2%',
            trend: 'up',
            icon: Target,
            color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/30'
          },
          {
            label: 'Tax Settlement Efficiency',
            value: '100.0%',
            desc: 'GSTR-1 state-wise filing integrity',
            change: '0.0% variance',
            trend: 'neutral',
            icon: Award,
            color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/30'
          }
        ].map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {metric.label}
              </span>
              <div className={`p-2 rounded-lg border ${metric.color}`}>
                <metric.icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <p className="font-display font-bold text-2xl text-slate-800 dark:text-white">
                {metric.value}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{metric.desc}</p>
            </div>

            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-50 dark:border-slate-800/80">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                metric.trend === 'up'
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-500'
              }`}>
                {metric.change}
              </span>
              <span className="text-[10px] text-slate-400">vs historical baseline</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Graphical Area chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left pane: Area chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Corporate Revenue Curve & Projections
              </h3>
              <p className="text-xs text-slate-500">Historical performance with linear model regression</p>
            </div>

            <div className="flex items-center bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-100 dark:border-slate-900">
              {(['q3', 'q4', 'annual'] as const).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setSelectedCycle(cycle)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    selectedCycle === cycle
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {cycle === 'q3' ? 'Q3 Session' : cycle === 'q4' ? 'Q4 Session' : 'Annual Master'}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full flex flex-col justify-between pt-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[1, 2, 3, 4].map((gridLine) => (
                <div key={gridLine} className="w-full border-t border-slate-100 dark:border-slate-800/80" />
              ))}
            </div>

            <div className="relative w-full h-48 mt-4">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 200">
                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="120" y1="0" x2="120" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/30" />
                <line x1="240" y1="0" x2="240" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/30" />
                <line x1="360" y1="0" x2="360" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/30" />
                <line x1="480" y1="0" x2="480" y2="200" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/30" />

                {/* Main area curve representing income flows */}
                <path
                  d="M0,150 Q120,90 240,110 T480,50 T600,20 L600,200 L0,200 Z"
                  fill="url(#curveGradient)"
                />

                {/* Main stroke */}
                <path
                  d="M0,150 Q120,90 240,110 T480,50 T600,20"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Graph Dots */}
                <circle cx="240" cy="110" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                <circle cx="480" cy="50" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            {/* X labels */}
            <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 px-1 pt-2">
              <span>AUG 2026</span>
              <span>SEP 2026</span>
              <span>OCT 2026</span>
              <span>NOV 2026</span>
              <span>DEC 2026 (FORECAST)</span>
            </div>
          </div>
        </div>

        {/* Right pane: Regional breakdown */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Sales by GST Jurisdiction
              </h3>
              <p className="text-xs text-slate-500">Breakdown of regional GSTR returns</p>
            </div>

            {/* Regional breakdown indicators */}
            <div className="space-y-3.5 pt-2">
              {[
                { region: 'Maharashtra (IGST/CGST 27)', share: '45.0%', width: 'w-[45%]', color: 'bg-blue-600', count: '₹5,60,250' },
                { region: 'Karnataka (IGST 29)', share: '35.0%', width: 'w-[35%]', color: 'bg-emerald-500', count: '₹4,35,750' },
                { region: 'Delhi State (IGST 07)', share: '20.0%', width: 'w-[20%]', color: 'bg-violet-500', count: '₹2,49,000' }
              ].map((reg, rIdx) => (
                <div key={rIdx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{reg.region}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{reg.share}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${reg.color} rounded-full`} style={{ width: reg.share }} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono text-right">{reg.count} total</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-50 dark:border-slate-800/80 text-[10px] text-slate-400 font-mono text-center bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl">
            Jurisdiction code filings validated
          </div>
        </div>

      </div>

      {/* Bottom Row: Top converting SKU tables */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Workspace SKU Conversions
          </h3>
          <p className="text-xs text-slate-500">Highest velocity line items across generated quotations</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="pb-3">SKU Identifier</th>
                <th className="pb-3">Catalog Designation</th>
                <th className="pb-3 text-center">Invoiced Closures</th>
                <th className="pb-3 text-right">Tax Rate</th>
                <th className="pb-3 text-right">Gross Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50 text-xs">
              {[
                { sku: 'FUR-ERGO-091', name: 'ErgoStream Z-Alpha Chair', sales: 42, tax: '18% GST', gross: '₹10,28,958' },
                { sku: 'AUD-HEAD-821', name: 'SonicWave Pro Max X1', sales: 8, tax: '12% GST', gross: '₹1,51,920' },
                { sku: 'PER-KEYB-223', name: 'KeyNexus 80% Mechanical', sales: 156, tax: '18% GST', gross: '₹13,26,000' }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20">
                  <td className="py-3.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                    {item.sku}
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300 font-semibold">
                    {item.name}
                  </td>
                  <td className="py-3.5 text-center font-bold font-mono text-slate-800 dark:text-slate-200">
                    {item.sales} Units
                  </td>
                  <td className="py-3.5 text-right font-bold text-slate-500">
                    {item.tax}
                  </td>
                  <td className="py-3.5 text-right font-extrabold font-mono text-blue-600 dark:text-blue-400">
                    {item.gross}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
