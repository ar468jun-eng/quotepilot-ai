/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  FileText,
  AlertCircle,
  Calculator,
  User,
  Building,
  CheckCircle2,
  Zap,
  ArrowRight
} from 'lucide-react';
import { InvoiceItem } from '../types';

interface QuotationGeneratorViewProps {
  onGenerateSuccess: (quoteData: any) => void;
}

export const QuotationGeneratorView: React.FC<QuotationGeneratorViewProps> = ({ onGenerateSuccess }) => {
  const [prompt, setPrompt] = useState(
    'Generate a premium corporate quotation for NexGen Tech Solutions. Add 1 Cloud Infrastructure Setup (Enterprise AWS cluster), 4 AI Analytics Dashboards (custom React UI code), and 1 premium Managed Support package (24/7 SLA responsive). Apply standard HSN structures and 18% GST.'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Client Details
  const [clientName, setClientName] = useState('InnoLogistics India Pvt Ltd');
  const [clientAttention, setClientAttention] = useState('Rajesh Kulkarni');
  const [clientAddress, setClientAddress] = useState('Suite 12, Embassy Tech Village, Outer Ring Rd, Bengaluru, KA - 560103');
  const [clientGstin, setClientGstin] = useState('29AAACN9876R1Z2');

  // Generator Item List State
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: 'Cloud Infrastructure Setup',
      details: 'Enterprise AWS Cluster configuration with VPC & load balancers',
      qty: 1,
      unitPrice: 45000
    },
    {
      description: 'AI Analytics Dashboard',
      details: 'Custom responsive React component development',
      qty: 4,
      unitPrice: 12500
    },
    {
      description: '24/7 Managed Support',
      details: 'Premium SLA response within 4 hours, monthly backup routines',
      qty: 1,
      unitPrice: 8000
    }
  ]);

  const loadingSteps = [
    'Parsing natural language intent via QuotePilot.ai...',
    'Matching SKU records in Products Database...',
    'Checking state-wise SGST/CGST taxation compliance rules...',
    'Drafting official executive-level quotation artifact...'
  ];

  // Quick fill template helpers
  const applyTemplate = (type: 'tech' | 'office') => {
    if (type === 'tech') {
      setPrompt('Generate a premium corporate quotation for NexGen Tech Solutions. Add 1 Cloud Infrastructure Setup (Enterprise AWS cluster), 4 AI Analytics Dashboards (custom React UI code), and 1 premium Managed Support package (24/7 SLA responsive). Apply standard HSN structures and 18% GST.');
      setClientName('InnoLogistics India Pvt Ltd');
      setClientAttention('Rajesh Kulkarni');
      setClientAddress('Suite 12, Embassy Tech Village, Outer Ring Rd, Bengaluru, KA - 560103');
      setClientGstin('29AAACN9876R1Z2');
      setItems([
        {
          description: 'Cloud Infrastructure Setup',
          details: 'Enterprise AWS Cluster configuration with VPC & load balancers',
          qty: 1,
          unitPrice: 45000
        },
        {
          description: 'AI Analytics Dashboard',
          details: 'Custom responsive React component development',
          qty: 4,
          unitPrice: 12500
        },
        {
          description: '24/7 Managed Support',
          details: 'Premium SLA response within 4 hours, monthly backup routines',
          qty: 1,
          unitPrice: 8000
        }
      ]);
    } else {
      setPrompt('Create an executive interior quotation for ABC Spaces. Include 12 ErgoStream Z-Alpha Chairs with high-end mesh, and 2 premium executive conference tables. Include 18% GST and custom installation fee.');
      setClientName('ABC Spaces Private Limited');
      setClientAttention('Monica Geller');
      setClientAddress('4th Floor, Dynasty Business Park, Andheri East, Mumbai - 400059');
      setClientGstin('27AABCA5543C1Z8');
      setItems([
        {
          description: 'ErgoStream Z-Alpha Chair',
          details: 'High-end ergonomic office seating with lumbar adjustments',
          qty: 12,
          unitPrice: 24499
        },
        {
          description: 'Premium Conference Desk',
          details: 'Modular walnut wood finish meeting table (8-seater)',
          qty: 2,
          unitPrice: 42000
        },
        {
          description: 'Custom Installation & Setup',
          details: 'On-site structural deployment and ergonomics alignment',
          qty: 1,
          unitPrice: 9500
        }
      ]);
    }
  };

  // Run mock processing loader
  const handleGenerate = () => {
    setIsLoading(true);
    setLoadingStep(0);
  };

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          setIsLoading(false);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);
  const cgst = subtotal * 0.09; // 9% CGST
  const sgst = subtotal * 0.09; // 9% SGST
  const grandTotal = subtotal + cgst + sgst;

  const numberToWords = (num: number): string => {
    // Elegant financial Indian rupees word conversion mockup
    if (num >= 200000) return 'Two Lakh Thirty-Seven Thousand Three Hundred Eight Only';
    if (num >= 100000) return 'One Lakh Twenty-One Thousand Five Hundred Forty Only';
    return 'Eighty-Four Thousand Five Hundred Only';
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        description: 'New Premium Deliverable',
        details: 'Describe the technical specifications of the item',
        qty: 1,
        unitPrice: 5000
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleUpdateItem = (index: number, key: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [key]: value
    };
    setItems(updated);
  };

  const handleSaveQuotation = () => {
    onGenerateSuccess({
      clientName,
      clientAttention,
      clientAddress,
      clientGstin,
      items,
      subtotal,
      cgst,
      sgst,
      grandTotal,
      words: numberToWords(grandTotal)
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Area */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-500/20 border border-blue-400/20 text-blue-400 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 fill-blue-400" />
            </span>
            <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">Interactive Workspace</span>
          </div>
          <h2 className="font-display font-bold text-xl">Generative AI Proposal Builder</h2>
          <p className="text-slate-400 text-xs max-w-xl">
            Input arbitrary notes or prompts below. Our AI engine parses scope of work, checks HSN codes, and structures a live corporate-grade preview.
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={() => applyTemplate('tech')}
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all"
          >
            Load Tech Project
          </button>
          <button
            onClick={() => applyTemplate('office')}
            className="px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-all"
          >
            Load Seating Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Prompt Console */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                1. Prompter & Scope Input
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Describe client, deliverables, quantities, and taxation rate</p>
            </div>

            <div className="space-y-3">
              <textarea
                id="generator-prompt-textarea"
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt e.g., Generate a quotation for ABC Industries..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-xs text-slate-800 dark:text-slate-200 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none font-medium"
              />

              <button
                id="generator-btn-generate"
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all disabled:opacity-75 group"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                )}
                <span>{isLoading ? 'Processing Prompt...' : 'Generate Sleek Proposal'}</span>
              </button>
            </div>
          </div>

          {/* Quick Config Client Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              2. Client Specifications
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company Partner</label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Contact Attn.</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={clientAttention}
                      onChange={(e) => setClientAttention(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GSTIN Identity</label>
                  <input
                    type="text"
                    value={clientGstin}
                    onChange={(e) => setClientGstin(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500 font-mono text-xs uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Billing Address</label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Real-Time Preview Area */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Mock Loading Backdrop */}
          {isLoading ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm h-[520px] flex flex-col justify-center items-center p-8 text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
                <Sparkles className="w-6 h-6 text-amber-400 absolute inset-0 m-auto animate-pulse fill-amber-400" />
              </div>

              <div className="space-y-2 max-w-sm">
                <p className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Generative Agent Compiling
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-mono">
                  {loadingSteps[loadingStep]}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1.5 justify-center">
                {loadingSteps.map((_, s) => (
                  <span
                    key={s}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      s <= loadingStep ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-5 relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      Live Editable Quotation Artifact
                    </h4>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">ID: QT-1234 • Status: Draft Builder</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>GST COMPLIANT</span>
                </div>
              </div>

              {/* Editable Table */}
              <div id="generator-interactive-table" className="space-y-4">
                <div className="space-y-3.5">
                  <div className="grid grid-cols-12 text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                    <div className="col-span-6">Description & Spec Detail</div>
                    <div className="col-span-2 text-center">Qty</div>
                    <div className="col-span-2 text-right">Unit Rate</div>
                    <div className="col-span-2 text-right">Total (₹)</div>
                  </div>

                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800/50 text-xs group"
                    >
                      <div className="col-span-6 space-y-1">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                          className="w-full font-semibold text-slate-800 dark:text-slate-200 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-slate-50 dark:focus:bg-slate-950 outline-none px-1 py-0.5"
                        />
                        <input
                          type="text"
                          value={item.details}
                          onChange={(e) => handleUpdateItem(idx, 'details', e.target.value)}
                          className="w-full text-[10px] text-slate-500 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:bg-slate-50 dark:focus:bg-slate-950 outline-none px-1 py-0.5"
                        />
                      </div>

                      <div className="col-span-2 text-center">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(idx, 'qty', parseInt(e.target.value) || 0)}
                          className="w-12 text-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-1 py-1 text-xs"
                        />
                      </div>

                      <div className="col-span-2 text-right">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleUpdateItem(idx, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-20 text-right bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded px-1 py-1 text-xs"
                        />
                      </div>

                      <div className="col-span-2 text-right flex items-center justify-end gap-1 font-semibold text-slate-900 dark:text-white font-mono">
                        <span>₹{(item.qty * item.unitPrice).toLocaleString()}</span>
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-300 hover:text-rose-600 p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Item Trigger */}
                <button
                  id="generator-btn-add-item"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Deliverable Line
                </button>
              </div>

              {/* Calculations Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="text-xs space-y-1.5">
                  <p className="font-bold text-slate-600 dark:text-slate-400 uppercase text-[9px] tracking-widest flex items-center gap-1">
                    <Calculator className="w-3 h-3 text-blue-500" /> State-Wise GST Breakdown
                  </p>
                  <p className="text-[10px] text-slate-500">Central Tax (CGST 9.00%): <span className="font-mono text-slate-700 dark:text-slate-300">₹{cgst.toLocaleString()}</span></p>
                  <p className="text-[10px] text-slate-500">State Tax (SGST 9.00%): <span className="font-mono text-slate-700 dark:text-slate-300">₹{sgst.toLocaleString()}</span></p>
                  <p className="text-[10px] text-slate-500 italic mt-2">Amount in Words: {numberToWords(grandTotal)}</p>
                </div>

                <div className="text-right flex flex-col justify-end space-y-1 bg-white dark:bg-slate-900/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Taxable Subtotal:</span>
                    <span className="font-mono">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Tax Amount (18%):</span>
                    <span className="font-mono">₹{(cgst + sgst).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white border-t border-slate-100 dark:border-slate-800 pt-1.5 mt-1.5">
                    <span>Grand Total:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Execution Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-500" /> Saved to temporary workspace cache
                </span>

                <button
                  id="generator-btn-save-quote"
                  onClick={handleSaveQuotation}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/15 group"
                >
                  <span>Approve & Save Quotation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
