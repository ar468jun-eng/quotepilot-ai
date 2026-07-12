/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Package,
  FileSpreadsheet,
  AlertTriangle,
  X,
  PlusCircle,
  Tag,
  CheckCircle,
  Hash,
  Edit2,
  Trash2,
  List,
  LayoutGrid
} from 'lucide-react';
import { Product } from '../types';

interface ProductsViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const ProductsView: React.FC<ProductsViewProps> = ({ products, setProducts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'FURNITURE' | 'AUDIO' | 'PERIPHERAL' | 'DISPLAY'>('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newGst, setNewGst] = useState('18');
  const [newHsn, setNewHsn] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newImage, setNewImage] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSku || !newName || !newPrice || !newStock) return;

    if (editingProduct) {
      // Update existing
      const updated = products.map((p) => {
        if (p.sku === editingProduct.sku) {
          return {
            ...p,
            name: newName,
            price: parseFloat(newPrice) || 0,
            taxGst: parseInt(newGst) || 18,
            hsn: newHsn || '9900',
            stock: parseInt(newStock) || 0,
            image: newImage || p.image
          };
        }
        return p;
      });
      setProducts(updated);
      setToastMessage(`Product ${newName} updated successfully.`);
    } else {
      // Create new
      const added: Product = {
        sku: newSku.toUpperCase(),
        name: newName,
        price: parseFloat(newPrice) || 0,
        taxGst: parseInt(newGst) || 18,
        hsn: newHsn || '9900',
        stock: parseInt(newStock) || 0,
        image: newImage || 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80'
      };
      setProducts([added, ...products]);
      setToastMessage(`Product SKU ${added.sku} registered successfully.`);
    }

    setModalOpen(false);
    setEditingProduct(null);

    // Reset inputs
    setNewSku('');
    setNewName('');
    setNewPrice('');
    setNewHsn('');
    setNewStock('');
    setNewImage('');

    setTimeout(() => setToastMessage(null), 2500);
  };

  const startEditingProduct = (p: Product) => {
    setEditingProduct(p);
    setNewSku(p.sku);
    setNewName(p.name);
    setNewPrice(p.price.toString());
    setNewGst(p.taxGst.toString());
    setNewHsn(p.hsn);
    setNewStock(p.stock.toString());
    setNewImage(p.image);
    setModalOpen(true);
  };

  const handleDeleteProduct = (sku: string) => {
    const remaining = products.filter((p) => p.sku !== sku);
    setProducts(remaining);
    setToastMessage(`SKU ${sku} deleted from catalog.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      categoryFilter === 'All' ||
      (categoryFilter === 'FURNITURE' && prod.sku.startsWith('FUR')) ||
      (categoryFilter === 'AUDIO' && prod.sku.startsWith('AUD')) ||
      (categoryFilter === 'PERIPHERAL' && prod.sku.startsWith('PER')) ||
      (categoryFilter === 'DISPLAY' && prod.sku.startsWith('DIS'));

    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 relative">
      
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 text-xs font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'FURNITURE', 'AUDIO', 'PERIPHERAL', 'DISPLAY'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  categoryFilter === cat
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dual layout Mode Toggle */}
          <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-800 p-0.5 rounded-xl bg-slate-50 dark:bg-slate-950">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Grid Catalog"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs pl-9 pr-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition-colors dark:text-white"
            />
          </div>

          <button
            id="products-btn-add-product"
            onClick={() => {
              setEditingProduct(null);
              setNewSku('');
              setNewName('');
              setNewPrice('');
              setNewHsn('');
              setNewStock('');
              setNewImage('');
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/10 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add SKU</span>
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50/50 dark:bg-slate-950/20">
                <th className="p-4">Product details & SKU</th>
                <th className="p-4">HSN/SAC</th>
                <th className="p-4 text-right">Price (₹)</th>
                <th className="p-4 text-right">GST %</th>
                <th className="p-4 text-right">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
              {filteredProducts.map((p) => (
                <tr key={p.sku} className="text-xs hover:bg-slate-50/35 dark:hover:bg-slate-950/10">
                  <td className="p-4 flex items-center gap-3 min-w-[200px]">
                    <img src={p.image} className="w-9 h-9 object-contain bg-slate-50 dark:bg-slate-950 rounded-lg p-1 border border-slate-100 dark:border-slate-800 shrink-0" alt={p.name} />
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono font-bold uppercase">{p.sku}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-500 font-semibold">{p.hsn}</td>
                  <td className="p-4 text-right font-bold text-slate-900 dark:text-white font-mono">
                    ₹{p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-right font-semibold text-slate-700 dark:text-slate-300 font-mono">{p.taxGst}%</td>
                  <td className="p-4 text-right">
                    {p.stock <= 10 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold text-[10px]">
                        {p.stock} left
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                        {p.stock} units
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => startEditingProduct(p)}
                        className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        title="Edit SKU"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.sku)}
                        className="p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        title="Delete SKU"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Products Grid Layout */
        <div id="products-catalog-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.sku}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between group hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300"
            >
              {/* Header Product Card */}
              <div>
                <div className="relative h-44 bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="max-h-36 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Stock Warning indicator badge */}
                  {prod.stock <= 10 ? (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20 text-[10px] font-bold">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Low Stock: {prod.stock} left</span>
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20 text-[10px] font-bold">
                      <span>{prod.stock} in stock</span>
                    </span>
                  )}
                </div>

                {/* Information body */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold uppercase">
                    <span>SKU: {prod.sku}</span>
                    <span>HSN: {prod.hsn}</span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
                    {prod.name}
                  </h4>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                      ₹{prod.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-500">+{prod.taxGst}% GST</span>
                  </div>
                </div>
              </div>

              {/* Footer with actions */}
              <div className="px-4 pb-4 pt-2 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">
                  Active SKU Matrix
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEditingProduct(prod)}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(prod.sku)}
                    className="p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add / Edit SKU Modal Dialogue */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalOpen(false);
                setEditingProduct(null);
                setNewSku('');
                setNewName('');
                setNewPrice('');
                setNewHsn('');
                setNewStock('');
                setNewImage('');
              }}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full shadow-2xl p-6 text-slate-900 dark:text-white"
            >
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingProduct(null);
                  setNewSku('');
                  setNewName('');
                  setNewPrice('');
                  setNewHsn('');
                  setNewStock('');
                  setNewImage('');
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="mb-5 flex items-center gap-2">
                <div className="p-2 bg-blue-50 dark:bg-blue-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base">
                    {editingProduct ? 'Modify SKU Details' : 'Register New SKU'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingProduct ? 'Update existing item inventory configuration' : 'Register new item inventory configuration'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-slate-400" /> SKU Identifier
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!!editingProduct}
                      placeholder="e.g. FUR-ERGO-092"
                      value={newSku}
                      onChange={(e) => setNewSku(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg outline-none transition-colors ${
                        editingProduct
                          ? 'bg-slate-100 dark:bg-slate-950 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-400'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">HSN Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 9403"
                      value={newHsn}
                      onChange={(e) => setNewHsn(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Executive Meeting Desk Pro"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 18500"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GST Tax Rate</label>
                    <select
                      value={newGst}
                      onChange={(e) => setNewGst(e.target.value)}
                      className="w-full px-2 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                    >
                      <option value="18">18% GST</option>
                      <option value="12">12% GST</option>
                      <option value="5">5% GST</option>
                      <option value="0">0% Excluded</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Opening Stock</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 50"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Asset Image URL</label>
                    <input
                      type="text"
                      placeholder="Leave blank for generic"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-500/15"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{editingProduct ? 'Update SKU Details' : 'Submit SKU Registry'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
