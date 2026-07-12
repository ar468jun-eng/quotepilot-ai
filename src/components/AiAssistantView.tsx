/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  RefreshCw,
  FileText,
  Percent,
  TrendingUp,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; actionId: string }[];
}

export const AiAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Welcome to **QuotePilot AI Workspace Assistant**. I am linked directly to your local SKU register, customer database, and outstanding invoice files.\n\nHere are some of the actions I can automate for you instantly:",
      timestamp: 'Just now',
      actions: [
        { label: 'Draft ₹80K Monitor quote for ABC', actionId: 'draft_quote' },
        { label: 'Check State GST Guidelines (HSN 9983)', actionId: 'gst_rules' },
        { label: 'Summarize Q3 Regional Performance', actionId: 'summarize_q3' }
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const getSystemResponse = (input: string, actionId?: string): string => {
    const text = input.toLowerCase();

    if (actionId === 'draft_quote' || text.includes('abc') || text.includes('monitor')) {
      return `### Generated Quotation Proposal Draft (GST-Compliant)

**Client Entity:** ABC Industries Ltd.  
**HSN Code:** 8471 (Computing units / Monitors)  
**Assessed Tax Jurisdiction:** Inter-state IGST @ 18%

| Item Description | Qty | Unit Price (₹) | CGST (9%) | SGST (9%) | IGST (18%) | Total (₹) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| ErgoStream 27" Full-HD Studio Monitor | 10 | 8,000 | - | - | 14,400 | 94,400 |

**Totals Summary:**
- **Taxable value:** ₹80,000.00
- **Integrated GST (18%):** ₹14,400.00
- **Consolidated Quote Value:** **₹94,400.00**

*Draft saved to pipeline queue. Would you like me to push this directly into your official Quotations drawer?*`;
    }

    if (actionId === 'gst_rules' || text.includes('hsn') || text.includes('gst')) {
      return `### GST & HSN Compliance Directory (9983)

Under official **Ministry of Finance** guidelines, HSN Service Code **9983** represents *Other Professional, Technical & Business Services*:

1. **Tax Matrix:**
   - **Intra-State sales:** 9% CGST + 9% SGST (Total 18%)
   - **Inter-State sales:** 18% IGST
2. **Exemptions:** Custom offshore software development exports are mapped to 0% Tax Value under valid Letter of Undertaking (LUT) submission.
3. **Filing Rules:** Ensure GSTR-1 records are matched with your recipient's registered company address to trigger seamless Input Tax Credit (ITC) flow.`;
    }

    if (actionId === 'summarize_q3' || text.includes('q3') || text.includes('report') || text.includes('revenue')) {
      return `### Performance Ledger Summary (Q3 Session)

Outstanding achievements across current operations:
- **Consolidated Realized Income:** ₹12,45,000.00 (+18.4% growth)
- **Top Jurisdiction:** Maharashtra (GSTR State-Code 27) accounting for **45.0%** of total commercial velocity.
- **Top converting SKU:** ErgoStream Z-Alpha Chair (FUR-ERGO-091) representing **42 units** converted in active quotes.
- **Average Lead Time to Settlement:** 6.4 Days (Down from 8.1 days last period).`;
    }

    return `I've analyzed your request: "${input}". 

Based on your local sales records, the current workspace contains **3 active product SKUs**, **4 corporate customer cards**, and a total realized billing history of **₹12,45,000**.

If you'd like to perform a task, please tell me who the partner is, which products they're buying, or use one of the quick automation pills below.`;
  };

  const handleSendMessage = (textToSend: string, actionId?: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getSystemResponse(textToSend, actionId);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actionId
          ? []
          : [
              { label: 'Draft matching quote', actionId: 'draft_quote' },
              { label: 'Check GST Guidelines', actionId: 'gst_rules' }
            ]
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm h-[680px] flex flex-col overflow-hidden relative">
      {/* Top Banner */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Workspace AI Assistant</h3>
            <p className="text-[10px] text-slate-500 font-mono">MODEL: DEEPMIND OMNI-FLASH • ONLINE</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg-init',
                sender: 'ai',
                text: "Session reinitialized. How can I streamline your executive workflows today?",
                timestamp: 'Just now',
                actions: [
                  { label: 'Draft ₹80K Monitor quote for ABC', actionId: 'draft_quote' },
                  { label: 'Check State GST Guidelines (HSN 9983)', actionId: 'gst_rules' },
                  { label: 'Summarize Q3 Regional Performance', actionId: 'summarize_q3' }
                ]
              }
            ]);
          }}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Canvas */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 font-bold text-[10px] ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-2 max-w-[85%]">
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed border relative group ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 border-slate-850 text-white'
                    : 'bg-slate-50/50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-850 text-slate-800 dark:text-slate-200'
                }`}
              >
                {/* Copy button */}
                <button
                  onClick={() => handleCopy(msg.text, msg.id)}
                  className="absolute top-2 right-2 p-1 rounded bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Copy message"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                {/* Text Content with simple markdown support */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.text.split('\n\n').map((para, pIdx) => {
                    // Check if paragraph is markdown header
                    if (para.startsWith('### ')) {
                      return (
                        <h4 key={pIdx} className="font-display font-bold text-sm text-slate-900 dark:text-white mt-3 mb-1">
                          {para.replace('### ', '')}
                        </h4>
                      );
                    }
                    // Check if paragraph is table
                    if (para.includes('|')) {
                      const lines = para.split('\n');
                      return (
                        <div key={pIdx} className="my-3 overflow-x-auto border border-slate-100 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-950/50">
                          <table className="w-full text-left border-collapse text-[10px] font-mono">
                            <thead>
                              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-400">
                                {lines[0]
                                  .split('|')
                                  .filter((_, i) => i > 0 && i < lines[0].split('|').length - 1)
                                  .map((col, cIdx) => (
                                    <th key={cIdx} className="px-3 py-2 font-bold">{col.trim()}</th>
                                  ))}
                              </tr>
                            </thead>
                            <tbody>
                              {lines
                                .slice(2)
                                .filter((line) => line.trim().startsWith('|'))
                                .map((line, rIdx) => (
                                  <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800/40 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-950/25">
                                    {line
                                      .split('|')
                                      .filter((_, i) => i > 0 && i < line.split('|').length - 1)
                                      .map((col, cIdx) => (
                                        <td key={cIdx} className="px-3 py-2 text-slate-700 dark:text-slate-300 font-semibold">{col.trim()}</td>
                                      ))}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    // Handle list items
                    if (para.startsWith('- ') || para.match(/^\d+\./)) {
                      return (
                        <ul key={pIdx} className="list-disc pl-5 space-y-1 my-2">
                          {para.split('\n').map((li, lIdx) => (
                            <li key={lIdx} className="leading-relaxed">
                              {li.replace(/^(-\s*|\d+\.\s*)/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    // Default text replacements for bolding
                    return (
                      <p key={pIdx}>
                        {para.split('**').map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-slate-950 dark:text-white">{chunk}</strong> : chunk
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Action Chips */}
              {msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.actions.map((act) => (
                    <button
                      key={act.actionId}
                      onClick={() => handleSendMessage(act.label, act.actionId)}
                      className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-900/30 transition-all hover:-translate-y-0.5"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[9px] font-mono text-slate-400 block px-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-400">
              <Bot className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Inputs */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. 'draft a quote for ABC Industries')"
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs pl-4 pr-10 py-3 rounded-xl outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors dark:text-white"
            />
            <div className="absolute right-3.5 top-3 flex items-center gap-1.5 text-slate-400">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            </div>
          </div>

          <button
            type="submit"
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/10 transition-colors flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-slate-400 font-mono text-center mt-2.5">
          Workspace intelligence engine auto-calibrates GST tax calculations on demand.
        </p>
      </div>
    </div>
  );
};
