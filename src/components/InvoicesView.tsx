/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Mail,
  Receipt,
  Plus,
  ArrowUpRight,
  MapPin,
  Calendar,
  Send,
  Printer,
  ChevronRight
} from 'lucide-react';
import { Invoice } from '../types';
import { MOCK_INVOICES } from '../data';

interface InvoicesViewProps {
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

export const InvoicesView: React.FC<InvoicesViewProps> = ({ invoices, setInvoices }) => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(invoices[0]?.id || '');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Pending' | 'Overdue'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Settle invoice payment state simulator
  const [recordSuccess, setRecordSuccess] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  const selectedInvoice = invoices.find((inv) => inv.id === selectedInvoiceId) || invoices[0];

  const handleRecordPayment = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'Paid' } : inv))
    );
    setRecordSuccess(true);
    setTimeout(() => setRecordSuccess(false), 2500);
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 2000);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesFilter = filterStatus === 'All' || inv.status === filterStatus;
    const matchesSearch =
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Invoice Navigation Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Paid', 'Pending', 'Overdue'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {status} Invoices
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search client or invoice #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs pl-9 pr-4 py-2 rounded-xl outline-none focus:border-blue-500 transition-colors dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Split Pane: Master (Invoices List) & Detail (Selected Invoice Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Master Invoices List */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-4 h-[600px] flex flex-col justify-between">
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Active Documents List ({filteredInvoices.length})
            </p>

            {filteredInvoices.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto" />
                <p>No invoices match criteria.</p>
              </div>
            ) : (
              filteredInvoices.map((inv) => {
                const isSelected = inv.id === selectedInvoiceId;
                return (
                  <div
                    key={inv.id}
                    onClick={() => {
                      setSelectedInvoiceId(inv.id);
                      setRecordSuccess(false);
                      setReminderSent(false);
                    }}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/20'
                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                          {inv.id}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                            : inv.status === 'Pending'
                            ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400'
                            : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {inv.clientName}
                      </p>
                      <p className="text-[10px] text-slate-400">Due: {inv.dueDate}</p>
                    </div>

                    <div className="text-right flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                        ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pt-4 border-t border-slate-50 dark:border-slate-800 text-[10px] text-slate-400 font-mono flex justify-between px-1">
            <span>Corporate Billing Suite</span>
            <span>AES-256 Validated</span>
          </div>
        </div>

        {/* Right Side: Invoice Detail Sheets */}
        <div className="lg:col-span-7">
          {selectedInvoice ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-md p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

              {/* Detail Header Action Panel */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <Receipt className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      Invoice Specification Node
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">{selectedInvoice.id} • Secure Ledger</p>
                  </div>
                </div>

                {/* Status-specific administrative actions */}
                <div className="flex items-center gap-1.5">
                  {selectedInvoice.status !== 'Paid' && (
                    <button
                      id="invoice-btn-record-payment"
                      onClick={() => handleRecordPayment(selectedInvoice.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10"
                    >
                      Record Payment
                    </button>
                  )}

                  {selectedInvoice.status !== 'Paid' && (
                    <button
                      id="invoice-btn-send-reminder"
                      onClick={handleSendReminder}
                      className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all"
                    >
                      {reminderSent ? 'Reminder Sent!' : 'Send Reminder'}
                    </button>
                  )}

                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg transition-colors" title="Download Standard Invoice">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Feedbacks */}
              {recordSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 p-3 rounded-xl border border-emerald-100 dark:border-emerald-950/40 text-xs font-semibold"
                >
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                  <span>Success! Invoice has been fully settled and updated in the workspace ledger.</span>
                </motion.div>
              )}

              {reminderSent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 p-3 rounded-xl border border-blue-100 dark:border-blue-950/40 text-xs font-semibold"
                >
                  <Send className="w-4.5 h-4.5 text-blue-500 shrink-0" />
                  <span>Corporate reminder email dispatched to <strong>{selectedInvoice.email}</strong>.</span>
                </motion.div>
              )}

              {/* Sheet Invoice Layout */}
              <div className="space-y-6 text-xs text-slate-600 dark:text-slate-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">Billed From</p>
                    <p className="font-bold text-slate-900 dark:text-white">Quantum Dynamics Core</p>
                    <p className="text-[10px] text-slate-400">GSTIN: 27AABCM1234F1Z5</p>
                    <p className="text-[10px]">Thane, Maharashtra - 400607</p>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">Client Recipient</p>
                    <p className="font-bold text-slate-900 dark:text-white">{selectedInvoice.clientName}</p>
                    <p className="text-[10px] text-slate-400">{selectedInvoice.email}</p>
                    <p className="text-[10px]">{selectedInvoice.billingAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <div>
                    <p className="font-bold text-slate-400 uppercase text-[8px] tracking-widest">Issue Date</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{selectedInvoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-400 uppercase text-[8px] tracking-widest">Due Date</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-1">{selectedInvoice.dueDate}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-400 uppercase text-[8px] tracking-widest">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold mt-1 uppercase ${
                      selectedInvoice.status === 'Paid'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>

                {/* Deliverables detail */}
                <div className="space-y-3">
                  <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">Line Item Breakdown</p>
                  
                  <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="grid grid-cols-12 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-2.5 font-bold text-[9px] uppercase tracking-wider text-slate-400">
                      <div className="col-span-8">Description</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Price ($)</div>
                    </div>

                    {selectedInvoice.items?.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-4 py-3 items-center">
                        <div className="col-span-8">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{item.description}</p>
                          <p className="text-[10px] text-slate-500">{item.details}</p>
                        </div>
                        <div className="col-span-2 text-center font-medium">{item.qty}</div>
                        <div className="col-span-2 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                          ${item.unitPrice.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtotals & Taxes */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col items-end space-y-2">
                  <div className="w-64 flex justify-between text-xs">
                    <span className="text-slate-400">Subtotal:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">${selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-64 flex justify-between text-xs">
                    <span className="text-slate-400">Calculated Taxes (Standard VAT/GST 0%):</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">$0.00</span>
                  </div>
                  <div className="w-64 flex justify-between text-sm font-bold border-t border-slate-100 dark:border-slate-800 pt-2 text-slate-900 dark:text-white">
                    <span>Total Amount due:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">
                      ${selectedInvoice.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-12 text-center text-slate-400">
              <p>Select an invoice from the list to preview details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
