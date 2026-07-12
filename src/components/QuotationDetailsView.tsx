/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Printer,
  Download,
  Share2,
  FileCheck,
  MessageSquare,
  Sparkles,
  Building,
  User,
  CheckCircle2,
  ShieldAlert,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ScreenType } from '../types';

interface QuotationDetailsViewProps {
  quoteData: any;
  setScreen: (screen: ScreenType) => void;
  onConvertToInvoice: (quoteData: any) => void;
}

export const QuotationDetailsView: React.FC<QuotationDetailsViewProps> = ({
  quoteData,
  setScreen,
  onConvertToInvoice
}) => {
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Fallback default details matching reference screens exactly if no generator data is supplied
  const data = quoteData || {
    clientName: 'InnoLogistics India Pvt Ltd',
    clientAttention: 'Rajesh Kulkarni',
    clientAddress: 'Suite 12, Embassy Tech Village, Outer Ring Rd, Bengaluru, KA - 560103',
    clientGstin: '29AAACN9876R1Z2',
    items: [
      {
        description: 'Cloud Infrastructure Setup',
        details: 'Enterprise AWS Cluster configuration with VPC, Subnets & Auto-Scaling',
        qty: 1,
        unitPrice: 45000
      },
      {
        description: 'AI Analytics Dashboard',
        details: 'Custom responsive React component development with real-time sockets',
        qty: 4,
        unitPrice: 12500
      },
      {
        description: '24/7 Managed Support',
        details: 'Premium SLA response within 4 hours, uptime validation monitoring',
        qty: 1,
        unitPrice: 8000
      }
    ],
    subtotal: 103000,
    cgst: 9270,
    sgst: 9270,
    grandTotal: 121540,
    words: 'One Lakh Twenty-One Thousand Five Hundred Forty Only'
  };

  const handleWhatsappShare = () => {
    setWhatsappSent(true);
    setToastMsg('Link copied & shared to WhatsApp successfully!');
    setTimeout(() => {
      setWhatsappSent(false);
      setToastMsg(null);
    }, 2500);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setToastMsg('Corporate PDF file compiled & downloaded successfully!');
      setTimeout(() => setToastMsg(null), 3000);
    }, 1200);
  };

  const handlePrint = () => {
    setPrinting(true);
    setToastMsg('Preparing print queue spooler...');
    setTimeout(() => {
      setPrinting(false);
      setToastMsg(null);
      window.print();
    }, 1000);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Toast Notification overlay */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Top Action Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <button
          id="quote-details-btn-back"
          onClick={() => setScreen('quotation_generator')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Prompt Console</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Simulated WhatsApp Integration */}
          <button
            id="quote-details-btn-whatsapp"
            onClick={handleWhatsappShare}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{whatsappSent ? 'Shared!' : 'Send WhatsApp'}</span>
          </button>

          {/* Download PDF */}
          <button
            id="quote-details-btn-download"
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
          >
            <Download className={`w-4 h-4 ${downloading ? 'animate-bounce' : ''}`} />
            <span>{downloading ? 'Downloading...' : 'Save PDF'}</span>
          </button>

          {/* Print */}
          <button
            id="quote-details-btn-print"
            onClick={handlePrint}
            disabled={printing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{printing ? 'Preparing...' : 'Print'}</span>
          </button>

          {/* Convert to Invoice */}
          <button
            id="quote-details-btn-convert"
            onClick={() => onConvertToInvoice(data)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all"
          >
            <FileCheck className="w-4 h-4" />
            <span>Convert to Invoice</span>
          </button>
        </div>
      </div>

      {/* Main Corporate Quotation Document Block */}
      <div
        id="corporate-quotation-sheet"
        className="bg-white text-slate-900 border border-slate-200 shadow-xl rounded-2xl max-w-4xl mx-auto p-8 md:p-12 space-y-8 font-sans transition-all relative overflow-hidden"
      >
        {/* Sleek top visual layout accents */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600" />

        {/* Document Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-600 text-white rounded-lg inline-flex items-center justify-center">
                <Sparkles className="w-4 h-4 fill-white" />
              </span>
              <span className="font-display font-bold text-xl tracking-tight">Quantum Dynamics</span>
            </div>
            <div className="text-[11px] text-slate-500 space-y-0.5 leading-relaxed font-medium">
              <p>GSTIN: 27AABCM1234F1Z5</p>
              <p>402, Quantum Heights, Hiranandani Estate,</p>
              <p>Thane West, Maharashtra - 400607</p>
              <p>Email: hello@nexgen.ai • Tel: +91 98765 43210</p>
            </div>
          </div>

          <div className="text-right space-y-1.5">
            <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono">
              OFFICIAL PROPOSAL
            </span>
            <h3 className="font-display font-extrabold text-2xl text-slate-800 tracking-tight">#QT-2024-1234</h3>
            <div className="text-[11px] text-slate-500 space-y-0.5 font-medium font-mono text-right">
              <p>DATE: Oct 14, 2024</p>
              <p>VALID UNTIL: Nov 14, 2024</p>
            </div>
          </div>
        </div>

        {/* Address Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs bg-slate-50/70 p-6 rounded-xl border border-slate-100">
          <div className="space-y-1.5">
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Client Details</p>
            <p className="font-bold text-slate-900 text-sm">{data.clientName}</p>
            <p className="text-slate-500 font-medium">Attn: {data.clientAttention}</p>
            <p className="text-slate-500 leading-relaxed font-medium">{data.clientAddress}</p>
          </div>

          <div className="md:text-right space-y-1.5 flex flex-col md:items-end">
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Tax Compliance Details</p>
            <div className="space-y-1">
              <p className="font-mono font-bold text-slate-800">GSTIN: {data.clientGstin}</p>
              <p className="text-slate-500 font-medium">Transaction: Intra-State Sales</p>
              <p className="text-slate-500 font-medium">Invoicing Standard: GSTR-1</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-3 font-semibold">Deliverable Specifications</th>
                <th className="pb-3 font-semibold text-center">Qty</th>
                <th className="pb-3 font-semibold text-right">Unit Rate (₹)</th>
                <th className="pb-3 font-semibold text-center">GST Rate</th>
                <th className="pb-3 font-semibold text-right">Total Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.map((item: any, idx: number) => (
                <tr key={idx} className="text-xs">
                  <td className="py-4 pr-4">
                    <p className="font-bold text-slate-800">{item.description}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-medium">{item.details}</p>
                  </td>
                  <td className="py-4 text-center font-semibold text-slate-700">{item.qty}</td>
                  <td className="py-4 text-right font-mono text-slate-700">₹{item.unitPrice.toLocaleString()}</td>
                  <td className="py-4 text-center text-[10px] font-bold text-slate-500">18.00%</td>
                  <td className="py-4 text-right font-bold font-mono text-slate-900">₹{(item.qty * item.unitPrice).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculations Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div className="text-[11px] text-slate-500 space-y-1.5 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[9px]">Declaration & Terms</p>
            <p>1. Payment terms: 50% advance, 50% post-launch within 7 business days.</p>
            <p>2. Uptime warranty covers AWS infrastructure under 99.9% support matrix.</p>
            <p className="font-semibold text-slate-900 mt-2">Amount in Words: {data.words}</p>
          </div>

          <div className="text-right space-y-2 flex flex-col justify-end">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Taxable Subtotal:</span>
              <span className="font-mono text-slate-800">₹{data.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Central Tax (CGST 9.00%):</span>
              <span className="font-mono text-slate-800">₹{data.cgst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>State Tax (SGST 9.00%):</span>
              <span className="font-mono text-slate-800">₹{data.sgst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-3 mt-1.5">
              <span>Proposal Grand Total:</span>
              <span className="font-mono text-blue-600 text-lg">₹{data.grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Signature & Authorization Section */}
        <div className="flex justify-between items-end pt-10 border-t border-slate-100 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Prepared By</p>
            <p className="font-bold text-slate-800">Quantum Dynamics Core Operations</p>
            <p className="text-[10px] text-slate-500 font-medium">SaaS Authorization Node</p>
          </div>

          <div className="text-right space-y-1">
            <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px] mb-4">Authorized Signature</p>
            <div className="font-serif italic text-lg text-slate-700 tracking-wider">Ananya Kulkarni</div>
            <p className="font-bold text-slate-800 mt-1">Ananya Kulkarni</p>
            <p className="text-[10px] text-slate-500">Founder & Managing Partner</p>
          </div>
        </div>

      </div>

    </div>
  );
};
