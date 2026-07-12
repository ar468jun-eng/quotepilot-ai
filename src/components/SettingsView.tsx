/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  Building,
  Users,
  CheckCircle,
  Plus,
  Trash2,
  Lock,
  Signature,
  Sliders,
  Sparkles,
  CloudLightning,
  HelpCircle
} from 'lucide-react';
import { TeamMember } from '../types';
import { MOCK_TEAM_MEMBERS } from '../data';

export const SettingsView: React.FC = () => {
  const [orgName, setOrgName] = useState('Quantum Dynamics');
  const [orgGstin, setOrgGstin] = useState('27AABCM1234F1Z5');
  const [authorizedSignatory, setAuthorizedSignatory] = useState('Ananya Kulkarni');
  const [logoUrl, setLogoUrl] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80');
  const [dragActive, setDragActive] = useState(false);
  
  // Team Members State
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Owner' | 'Manager' | 'Admin'>('Admin');

  // Custom visual theme color state simulator
  const [activeThemeColor, setActiveThemeColor] = useState<'blue' | 'violet' | 'emerald' | 'rose'>('blue');

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;

    const initials = newMemberName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const added: TeamMember = {
      id: `TEAM-${Math.floor(10 + Math.random() * 90)}`,
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      initials
    };

    setTeam([...team, added]);
    setNewMemberName('');
    setNewMemberEmail('');
    setToastMsg(`Invited ${added.name} to workspace successfully.`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleRemoveMember = (id: string) => {
    setTeam(team.filter((t) => t.id !== id));
    setToastMsg('Team member revoked successfully.');
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleSaveOrganization = () => {
    setToastMsg('Corporate identity successfully updated in workspace.');
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Corporate Setup & Digital Signatures */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Organization Identity Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <Building className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Organization Identification
                </h3>
                <p className="text-[11px] text-slate-500">Corporate configuration & legal taxation fields</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Company legal Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Corporate GSTIN ID</label>
                <input
                  type="text"
                  value={orgGstin}
                  onChange={(e) => setOrgGstin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 font-mono text-xs uppercase text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Logo Area */}
            <div className="pt-1 text-xs">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Company Corporate Logo</label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center border border-indigo-100 dark:border-indigo-900/30 overflow-hidden shrink-0">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <Building className="w-6 h-6 text-indigo-600" />
                  )}
                </div>
                
                <div 
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0];
                      const url = URL.createObjectURL(file);
                      setLogoUrl(url);
                      setToastMsg('Logo uploaded via drag-and-drop!');
                      setTimeout(() => setToastMsg(null), 2500);
                    }
                  }}
                  onClick={() => document.getElementById('logo-file-input')?.click()}
                  className={`flex-1 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                    dragActive 
                      ? 'border-indigo-500 bg-indigo-50/10' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-500'
                  }`}
                >
                  <input 
                    type="file" 
                    id="logo-file-input" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const url = URL.createObjectURL(file);
                        setLogoUrl(url);
                        setToastMsg('Logo uploaded successfully!');
                        setTimeout(() => setToastMsg(null), 2500);
                      }
                    }}
                  />
                  <p className="font-semibold text-slate-700 dark:text-slate-300 text-xs">
                    Drag & drop corporate logo, or <span className="text-indigo-600 dark:text-indigo-400">browse files</span>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">Supports PNG, JPG, or SVG (Max 2MB)</p>
                </div>
              </div>
            </div>

            {/* Digital signature mock configuration */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Authorized Signatory Name
                </label>
                <div className="relative">
                  <Signature className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={authorizedSignatory}
                    onChange={(e) => setAuthorizedSignatory(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Live drawing/font signature rendering showcase */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 text-center">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-left mb-2">
                  Interactive Signature Preview
                </p>
                <div className="py-4 font-serif italic text-3xl text-slate-700 dark:text-slate-300 tracking-wider">
                  {authorizedSignatory || 'No signature name entered'}
                </div>
                <p className="text-[10px] text-slate-500">Auto-injects to approved Quotation PDFs</p>
              </div>
            </div>

            <button
              id="settings-btn-save-org"
              onClick={handleSaveOrganization}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Update Identity
            </button>
          </div>

          {/* Theme customizer workspace pane */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Appearance Controls
                </h3>
                <p className="text-[11px] text-slate-500">Select active corporate branding color accents</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              {[
                { id: 'blue', label: 'Classic Corporate', class: 'bg-blue-600' },
                { id: 'violet', label: 'Elegance Violet', class: 'bg-violet-600' },
                { id: 'emerald', label: 'Compliance Mint', class: 'bg-emerald-600' },
                { id: 'rose', label: 'Impact Rose', class: 'bg-rose-600' }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => {
                    setActiveThemeColor(theme.id as any);
                    setToastMsg(`Applied ${theme.label} accent!`);
                    setTimeout(() => setToastMsg(null), 2000);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    activeThemeColor === theme.id
                      ? 'border-blue-600 dark:border-blue-400 bg-blue-50/20 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.class}`} />
                  <span>{theme.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Team Management Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  Workspace Team List
                </h3>
                <p className="text-[11px] text-slate-500">Team members with administrator permissions</p>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 text-xs">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center font-mono border border-blue-100 dark:border-blue-900/20">
                      {member.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{member.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                      {member.role}
                    </span>
                    {member.role !== 'Owner' && (
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 rounded transition-colors"
                        title="Revoke access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Team Member form */}
            <form onSubmit={handleAddMember} className="space-y-3 border-t border-slate-100 dark:border-slate-800/80 pt-4 text-xs">
              <p className="font-bold text-slate-400 uppercase text-[9px] tracking-widest">Invite Team Node</p>
              
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  required
                  placeholder="name@quantum.in"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as any)}
                  className="px-2 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                </select>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Invite</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
