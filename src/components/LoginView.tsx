/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  PlaneTakeoff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('arjun@quantumdynamics.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate real high-speed workspace authentication
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 850);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row">
      
      {/* Left Pane: Brand & Product Value */}
      <div className="lg:w-[55%] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-12 lg:p-20 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        {/* Ambient color blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        {/* Top Branding Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 flex items-center justify-center">
            <PlaneTakeoff className="w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">
            QuotePilot<span className="text-blue-400">.ai</span>
          </span>
        </div>

        {/* Middle Value Proposition Copy */}
        <div className="my-16 lg:my-0 relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" /> Premium Sales Automation
            </span>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl leading-tight tracking-tight text-white mb-6">
              Precision sales automation for the modern enterprise.
            </h2>
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-8">
              Generate fully customized, GST-compliant corporate quotations in seconds. Convert quotes to professional invoices with one-click, track payments, and get predictive financial metrics.
            </p>
          </motion.div>

          {/* Core Benefit Checklist */}
          <div className="space-y-4">
            {[
              { title: 'Generative AI Quote Automation', desc: 'Convert rough prompts or notes into sleek executive offers' },
              { title: 'GST & HSN Compliance Engine', desc: 'Automated state-wise IGST, CGST, SGST & item-wise taxation' },
              { title: 'Bento-Grid Billing & Analytics', desc: 'Seamlessly follow pipeline conversions and overdue alerts' }
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 p-0.5 rounded-full bg-blue-500/20 text-blue-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{benefit.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer info & security badge */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-6 mt-8 relative z-10">
          <span className="flex items-center gap-1.5 font-mono">
            <Globe className="w-3.5 h-3.5" /> Workspace: ASIA-SOUTH1 (27A)
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> AES-256 Encrypted
          </span>
        </div>
      </div>

      {/* Right Pane: Login Form Card */}
      <div className="lg:w-[45%] flex flex-col justify-center items-center p-8 lg:p-16 bg-white dark:bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-900">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
              Sign In to Workspace
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5">
              Enter your corporate credentials to access QuotePilot suite
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-xs font-medium text-slate-600 dark:text-slate-400 select-none">
                Remember my workstation credentials for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all disabled:opacity-75 group"
            >
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 animate-spin text-white" /> Loading Workspace...
                </span>
              ) : (
                <>
                  <span>Sign In Securely</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social login / Google Workspace Single Sign-On */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-3 text-slate-500 font-mono">Or SSO Integrations</span>
            </div>
          </div>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-medium py-3 px-4 rounded-xl text-sm transition-all shadow-sm"
          >
            {/* Google Vector Icon */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google Workspace Account</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};
