/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { QuotationGeneratorView } from './components/QuotationGeneratorView';
import { QuotationDetailsView } from './components/QuotationDetailsView';
import { InvoicesView } from './components/InvoicesView';
import { ProductsView } from './components/ProductsView';
import { CustomersView } from './components/CustomersView';
import { ReportsView } from './components/ReportsView';
import { SettingsView } from './components/SettingsView';
import { AiAssistantView } from './components/AiAssistantView';

import { ScreenType, Invoice, Product, Customer } from './types';
import { MOCK_INVOICES, MOCK_PRODUCTS, MOCK_CUSTOMERS } from './data';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // Check local storage so the session is preserved during review
    const saved = localStorage.getItem('quotepilot_session');
    return saved === 'active';
  });

  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    return isLoggedIn ? 'dashboard' : 'login';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark;
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedQuoteData, setSelectedQuoteData] = useState<any>(null);

  // Core Global States
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Session Login/Logout Handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('quotepilot_session', 'active');
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('quotepilot_session');
    setCurrentScreen('login');
  };

  // Bridge action: Convert a quotation successfully into an official invoice record
  const handleConvertToInvoice = (quote: any) => {
    const randomizedId = `#INV-2024-${Math.floor(8000 + Math.random() * 1999)}`;
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    // 30 days due date mockup
    const dueDateObj = new Date();
    dueDateObj.setDate(dueDateObj.getDate() + 30);
    const dueDate = dueDateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newInvoice: Invoice = {
      id: randomizedId,
      clientName: quote.clientName,
      status: 'Pending',
      dueDate,
      issueDate: today,
      amount: quote.grandTotal / 84, // convert rupees to mock invoice dollars
      email: 'finance@' + quote.clientName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
      billingAddress: quote.clientAddress,
      description: 'SaaS Platform Services & Hardware Setup',
      items: quote.items.map((item: any) => ({
        description: item.description,
        details: item.details,
        qty: item.qty,
        unitPrice: item.unitPrice / 84 // normalize rate to dollars
      }))
    };

    // Prepend new invoice to global invoices list
    setInvoices([newInvoice, ...invoices]);
    setCurrentScreen('invoices');
  };

  // Bridge action: Receive generated proposal and forward to document details viewer
  const handleGenerateSuccess = (quoteData: any) => {
    setSelectedQuoteData(quoteData);
    setCurrentScreen('quotation_details');
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardView setScreen={setCurrentScreen} />;
      case 'quotation_generator':
        return <QuotationGeneratorView onGenerateSuccess={handleGenerateSuccess} />;
      case 'quotation_details':
        return (
          <QuotationDetailsView
            quoteData={selectedQuoteData}
            setScreen={setCurrentScreen}
            onConvertToInvoice={handleConvertToInvoice}
          />
        );
      case 'invoices':
        return <InvoicesView invoices={invoices} setInvoices={setInvoices} />;
      case 'products':
        return <ProductsView products={products} setProducts={setProducts} />;
      case 'customers':
        return <CustomersView customers={customers} setCustomers={setCustomers} />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'ai_assistant':
        return <AiAssistantView />;
      default:
        return <DashboardView setScreen={setCurrentScreen} />;
    }
  };

  const getScreenMeta = () => {
    switch (currentScreen) {
      case 'dashboard':
        return { title: 'Dashboard Overview', subtitle: 'Global pipeline and financial efficiency tracking' };
      case 'quotation_generator':
        return { title: 'Generative AI Quotation Builder', subtitle: 'Turn client instructions or brief notes into GST compliant quotations' };
      case 'quotation_details':
        return { title: 'Quotation Artifact Preview', subtitle: 'Official executive proposal and compliance sheet' };
      case 'invoices':
        return { title: 'Invoices & Billing Suite', subtitle: 'Record client payments, dispatch reminders and track receivables' };
      case 'products':
        return { title: 'Products & SKU Inventory', subtitle: 'Configure stock counts, HSN codes and corporate pricing metrics' };
      case 'customers':
        return { title: 'Customer Database & CRM', subtitle: 'Corporate relationships, lifetime values and commercial logs' };
      case 'reports':
        return { title: 'Reports & Analytics', subtitle: 'Real-time revenue metrics, regional returns and trend charts' };
      case 'settings':
        return { title: 'Workspace Settings', subtitle: 'Configure legal identity, team members, and interface palettes' };
      case 'ai_assistant':
        return { title: 'AI Workspace Assistant', subtitle: 'Ask questions, draft contracts and query your sales databases instantly' };
      default:
        return { title: 'QuotePilot AI Workspace', subtitle: 'Precision sales automation console' };
    }
  };

  // Logged-out layout
  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  // Active administrative workstation shell
  const meta = getScreenMeta();
  const sidebarWidthClass = isCollapsed ? 'pl-20' : 'pl-64';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Persistent Workspace Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onLogout={handleLogout}
      />

      {/* Primary Workstation Viewport */}
      <div className={`transition-all duration-300 min-h-screen flex flex-col ${sidebarWidthClass}`}>
        
        {/* Dynamic Navigation & Action Header */}
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        {/* Content Pane Wrapper */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
            >
              {renderActiveScreen()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}
