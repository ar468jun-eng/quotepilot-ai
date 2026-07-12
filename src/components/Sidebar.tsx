/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Sparkles,
  Receipt,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlaneTakeoff,
  UserCheck,
  Bot
} from 'lucide-react';
import { ScreenType } from '../types';
import { USER_PROFILES } from '../data';

interface SidebarProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  setScreen,
  isCollapsed,
  setIsCollapsed,
  onLogout
}) => {
  const user = USER_PROFILES.arjun; // Default owner

  interface MenuItem {
    id: ScreenType;
    name: string;
    icon: React.ComponentType<any>;
    badge?: string;
  }

  const menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', name: 'Customers', icon: Users },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'quotation_generator', name: 'Quotations', icon: Sparkles, badge: 'AI' },
    { id: 'invoices', name: 'Invoices', icon: Receipt },
    { id: 'ai_assistant', name: 'AI Assistant', icon: Bot, badge: 'CHAT' },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <aside
      id="app-sidebar"
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 border-r border-slate-800 bg-slate-900 flex flex-col justify-between ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Header Branding */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div
            id="sidebar-logo-container"
            className="flex items-center gap-3 overflow-hidden cursor-pointer"
            onClick={() => setScreen('dashboard')}
          >
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 flex items-center justify-center">
              <PlaneTakeoff className="w-5 h-5 animate-pulse-slow" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display font-bold text-lg text-white tracking-tight"
              >
                QuotePilot<span className="text-indigo-500">.ai</span>
              </motion.div>
            )}
          </div>

          <button
            id="sidebar-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors hidden md:block"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav id="sidebar-nav-menu" className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = currentScreen === item.id || (item.id === 'quotation_generator' && currentScreen === 'quotation_details');
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => setScreen(item.id)}
                className={`relative w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 group ${
                  isActive
                    ? 'text-white bg-slate-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {/* Active Accent Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveBackground"
                    className="absolute inset-0 bg-slate-800 rounded-xl border-l-3 border-indigo-500 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'scale-105' : 'group-hover:scale-105'}`} />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.name}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
                    {item.badge}
                  </span>
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3 p-1.5 rounded-xl">
          <img
            id="sidebar-user-avatar"
            src={user.avatar}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-xl object-cover border border-slate-850"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate flex items-center gap-1">
                {user.name}
                <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              </p>
              <p className="text-[10px] text-slate-500 font-mono truncate uppercase">
                {user.role} • {user.tier}
              </p>
            </div>
          )}
        </div>

        <button
          id="sidebar-logout-btn"
          onClick={onLogout}
          className={`mt-2.5 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/20 transition-all group`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          {!isCollapsed && <span>Sign Out Workspace</span>}
        </button>
      </div>
    </aside>
  );
};
