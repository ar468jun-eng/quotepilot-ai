/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Sun, Moon, Bell, Search, Calendar, ChevronDown, CheckCircle2, CloudLightning } from 'lucide-react';
import { USER_PROFILES } from '../data';

interface HeaderProps {
  title: string;
  subtitle?: string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, isDarkMode, setIsDarkMode }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [systemAlert, setSystemAlert] = useState<string | null>(
    'System Alert: Workspace synchronized successfully with Cloud Server'
  );
  
  const user = USER_PROFILES.arjun;
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header
      id="app-header"
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80"
    >
      {/* Title & Greeting section */}
      <div>
        <h1 id="header-title" className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        {subtitle ? (
          <p id="header-subtitle" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        ) : (
          <p id="header-subtitle" className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Welcome back, {user.name.split(' ')[0]} • {today}</span>
          </p>
        )}
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar Simulator */}
        <div id="header-search-container" className="relative hidden lg:block w-72">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
          <input
            id="header-search-input"
            type="text"
            placeholder="Search quotations, customers..."
            className="w-full bg-slate-100/60 dark:bg-slate-900/60 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 text-sm pl-10 pr-4 py-2 rounded-xl outline-none transition-all dark:text-white"
          />
        </div>

        {/* Sync Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-medium border border-emerald-100 dark:border-emerald-950/40">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="font-mono text-[10px]">SYNCED</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notifications-toggle-btn"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setSystemAlert(null); // Dismiss dynamic alert dot on click
            }}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {systemAlert && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-950 rounded-full animate-bounce" />
            )}
          </button>

          {notificationsOpen && (
            <div
              id="notifications-dropdown"
              className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl z-50 p-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Recent Notifications</p>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-3 mt-3">
                <div className="flex gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">AI Quotation Success</p>
                    <p className="text-[10px] text-slate-500">Draft generated for NexGen Solutions successfully.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">Payment of ₹42,500 Cleared</p>
                    <p className="text-[10px] text-slate-500">TechFlow Solutions paid Invoice #INV-8291.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Small User Info Accent */}
        <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
          <img
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div className="text-left">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-20">
              Arjun
            </p>
            <p className="text-[9px] text-slate-500 font-mono">WORKSPACE ID: 0465</p>
          </div>
        </div>
      </div>
    </header>
  );
};
