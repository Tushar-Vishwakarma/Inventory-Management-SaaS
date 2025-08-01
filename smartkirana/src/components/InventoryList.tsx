'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, Trash2, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { InventoryListProps, InventoryItem } from '@/types';

export default function InventoryList({ items, onItemsUpdated }: InventoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'price' | 'quantity'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('smartkirana-inventory', JSON.stringify(items));
  }, [items]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('smartkirana-inventory');
    if (saved) {
      try {
        const savedItems = JSON.parse(saved);
        if (Array.isArray(savedItems) && savedItems.length > 0) {
          onItemsUpdated(savedItems);
        }
      } catch (error) {
        console.error('Failed to load saved inventory:', error);
      }
    }
  }, [onItemsUpdated]);

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category).filter(Boolean)))];

  const filteredItems = items
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.dateAdded);
          bValue = new Date(b.dateAdded);
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'quantity':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    onItemsUpdated(updatedItems);
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Quantity', 'Unit', 'Price', 'Category', 'Date Added'],
      ...filteredItems.map(item => [
        item.name,
        item.quantity.toString(),
        item.unit,
        item.price.toString(),
        item.category || '',
        new Date(item.dateAdded).toLocaleDateString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smartkirana-inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">
          Inventory ({items.length} items)
        </h3>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          disabled={items.length === 0}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Total Items</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">{totalItems}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">₹{totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">Categories</span>
          </div>
          <p className="text-2xl font-bold text-purple-900 mt-1">{categories.length - 1}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'price' | 'quantity')}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="quantity">Sort by Quantity</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {sortOrder === 'asc' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <InventoryItemCard 
              key={item.id} 
              item={item} 
              onDelete={() => handleDelete(item.id)} 
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {items.length === 0 ? 'No inventory items yet' : 'No items match your filters'}
            </h3>
            <p className="text-gray-600">
              {items.length === 0 
                ? 'Upload your first bill to get started' 
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InventoryItemCard({ 
  item, 
  onDelete 
}: { 
  item: InventoryItem; 
  onDelete: () => void; 
}) {
  const itemValue = item.price * item.quantity;
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
                <span>Qty: {item.quantity} {item.unit}</span>
                <span>₹{item.price} each</span>
                <span className="font-medium text-green-600">Total: ₹{itemValue.toFixed(2)}</span>
                {item.category && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {item.category}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Added: {new Date(item.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}