/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Users,
  CheckCircle,
  X,
  Mail,
  Phone,
  Building,
  UserPlus,
  TrendingUp,
  UserCheck,
  ChevronRight,
  Edit2,
  Trash2
} from 'lucide-react';
import { Customer } from '../types';

interface CustomersViewProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers, setCustomers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [totalBusiness, setTotalBusiness] = useState('');

  // Toast
  const [toast, setToast] = useState<string | null>(null);

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    if (editingCustomer) {
      // Update existing
      const updated = customers.map((c) => {
        if (c.id === editingCustomer.id) {
          return {
            ...c,
            name,
            company,
            phone: phone || '+91 99999-88888',
            email: email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
            totalBusiness: parseFloat(totalBusiness) || 0,
            initials
          };
        }
        return c;
      });
      setCustomers(updated);
      setToast(`Client ${name} updated successfully.`);
    } else {
      // Create new
      const added: Customer = {
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        name,
        company,
        phone: phone || '+91 99999-88888',
        email: email || `${name.toLowerCase().replace(' ', '.')}@company.com`,
        totalBusiness: parseFloat(totalBusiness) || 0,
        initials,
        status: 'active',
        growth: true
      };
      setCustomers([added, ...customers]);
      setToast(`Client ${added.name} registered successfully.`);
    }

    setModalOpen(false);
    setEditingCustomer(null);

    // Reset fields
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setTotalBusiness('');

    setTimeout(() => setToast(null), 2500);
  };

  const startEditing = (c: Customer) => {
    setEditingCustomer(c);
    setName(c.name);
    setCompany(c.company);
    setEmail(c.email);
    setPhone(c.phone);
    setTotalBusiness(c.totalBusiness.toString());
    setModalOpen(true);
  };

  const handleDeleteCustomer = (id: string) => {
    const cName = customers.find((c) => c.id === id)?.name || '';
    const remaining = customers.filter((c) => c.id !== id);
    setCustomers(remaining);
    if (remaining.length > 0) {
      setSelectedCustomerId(remaining[0].id);
    } else {
      setSelectedCustomerId('');
    }
    setToast(`Client ${cName} deleted from database.`);
    setTimeout(() => setToast(null), 2500);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div>
          <h3 className="font-display font-bold text-base text-slate-950 dark:text-white">Customer Database</h3>
          <p className="text-xs text-slate-500">Corporate partners & commercial relationships</p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search partner or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition-colors dark:text-white"
            />
          </div>

          <button
            id="customers-btn-add-customer"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/10 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Register Partner</span>
          </button>
        </div>
      </div>

      {/* Split Pane: Master List & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Master List Table */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm overflow-x-auto h-[600px] flex flex-col justify-between">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                <th className="pb-3">Client Executive</th>
                <th className="pb-3">Company Name</th>
                <th className="pb-3 text-right">Lifetime Capital</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredCustomers.map((c) => {
                const isSelected = c.id === selectedCustomerId;
                return (
                  <tr
                    key={c.id}
                    onClick={() => {
                      setSelectedCustomerId(c.id);
                      setToast(null);
                    }}
                    className={`text-xs group cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/30 dark:bg-blue-950/20'
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-950/10'
                    }`}
                  >
                    <td className="py-4 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center font-mono text-xs border border-blue-100 dark:border-blue-900/20">
                        {c.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.email}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">{c.company}</p>
                      <p className="text-[10px] text-slate-400">{c.phone}</p>
                    </td>
                    <td className="py-4 text-right font-bold text-slate-900 dark:text-slate-100 font-mono">
                      ₹{c.totalBusiness.toLocaleString()}
                    </td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pt-4 border-t border-slate-50 dark:border-slate-800 text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Corporate CRM Engine</span>
            <span>Total: {filteredCustomers.length} Records</span>
          </div>
        </div>

        {/* Right: Selected Customer Card Detail */}
        <div className="lg:col-span-5">
          {selectedCustomer ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

              {/* Detail Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center font-mono text-base border border-blue-100 dark:border-blue-900/30">
                  {selectedCustomer.initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {selectedCustomer.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">Lead Executive • {selectedCustomer.company}</p>
                </div>
              </div>

              {/* Relationship Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/50">
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Lifetime Business</span>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 font-mono mt-1">
                    ₹{selectedCustomer.totalBusiness.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/50">
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Relationship Health</span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Strong (100%)</span>
                  </div>
                </div>
              </div>

              {/* Communications Block */}
              <div className="space-y-3.5 text-xs">
                <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">Workspace Communications</p>
                
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="font-medium truncate">{selectedCustomer.email}</span>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="font-medium font-mono">{selectedCustomer.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 text-slate-600 dark:text-slate-300">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span className="font-medium truncate">HQ: Maharashtra (MH-27)</span>
                  </div>
                </div>
              </div>

              {/* Workspace Actions block */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => startEditing(selectedCustomer)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Edit Partner</span>
                </button>
                <button
                  onClick={() => handleDeleteCustomer(selectedCustomer.id)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-xl transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Partner</span>
                </button>
              </div>

              {/* Quick dispatch actions */}
              <div className="pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">Validated Account ID: {selectedCustomer.id}</span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">KYC CLEARED</span>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-12 text-center text-slate-400">
              <p>Select a customer from the database list to inspect profile.</p>
            </div>
          )}
        </div>

      </div>

      {/* Register / Update Customer Modal Dialogue */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalOpen(false);
                setEditingCustomer(null);
                setName('');
                setCompany('');
                setEmail('');
                setPhone('');
                setTotalBusiness('');
              }}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full shadow-2xl p-6 text-slate-900 dark:text-white"
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingCustomer(null);
                  setName('');
                  setCompany('');
                  setEmail('');
                  setPhone('');
                  setTotalBusiness('');
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="mb-5 flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base">
                    {editingCustomer ? 'Modify Corporate Partner' : 'Register Corporate Partner'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingCustomer ? 'Update partner profile records' : 'Add corporate clients and commercial profiles'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveCustomer} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Contact Executive</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kulkarni"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company / Corporate Entity</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NexGen Tech Solutions"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Work Email</label>
                    <input
                      type="email"
                      placeholder="e.g. ramesh@nexgen.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Contact Phone</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765-43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Lifetime Business Value (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 150000"
                    value={totalBusiness}
                    onChange={(e) => setTotalBusiness(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/15"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{editingCustomer ? 'Update Partner Profile' : 'Register Corporate Relationship'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
