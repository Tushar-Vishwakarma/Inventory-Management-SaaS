'use client';

import { useState } from 'react';
import { Edit3, Save, Plus, Trash2, Check, X } from 'lucide-react';
import { ExtractedDataProps, InventoryItem } from '@/types';

export default function ExtractedData({ items, onItemsUpdated, onSaveToInventory }: ExtractedDataProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<InventoryItem>>({});

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const handleSaveEdit = () => {
    if (editingId && editForm) {
      const updatedItems = items.map(item => 
        item.id === editingId ? { ...item, ...editForm } : item
      );
      onItemsUpdated(updatedItems);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    const filteredItems = items.filter(item => item.id !== id);
    onItemsUpdated(filteredItems);
  };

  const handleAddNew = () => {
    const newItem: InventoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      quantity: 1,
      unit: 'piece',
      price: 0,
      dateAdded: new Date().toISOString(),
      category: 'General'
    };
    onItemsUpdated([...items, newItem]);
    setEditingId(newItem.id);
    setEditForm(newItem);
  };

  const handleSaveAll = () => {
    if (editingId) {
      handleSaveEdit();
    }
    onSaveToInventory(items.filter(item => item.name.trim() !== ''));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">
          Extracted Items ({items.length})
        </h3>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            {editingId === item.id ? (
              <EditForm
                item={editForm}
                onChange={setEditForm}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            ) : (
              <ItemDisplay
                item={item}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            )}
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleSaveAll}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Save className="w-5 h-5" />
            <span>Save to Inventory</span>
          </button>
        </div>
      )}
    </div>
  );
}

function ItemDisplay({ 
  item, 
  onEdit, 
  onDelete 
}: { 
  item: InventoryItem; 
  onEdit: () => void; 
  onDelete: () => void; 
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{item.name}</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>Qty: {item.quantity} {item.unit}</span>
              <span>₹{item.price}</span>
              {item.category && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Edit3 className="w-4 h-4" />
        </button>
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

function EditForm({
  item,
  onChange,
  onSave,
  onCancel
}: {
  item: Partial<InventoryItem>;
  onChange: (item: Partial<InventoryItem>) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const handleChange = (field: keyof InventoryItem, value: string | number) => {
    onChange({ ...item, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Item name"
          value={item.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={item.category || 'General'}
          onChange={(e) => handleChange('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="General">General</option>
          <option value="Grains & Pulses">Grains & Pulses</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Oils & Fats">Oils & Fats</option>
          <option value="Condiments">Condiments</option>
          <option value="Beverages">Beverages</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <input
          type="number"
          placeholder="Quantity"
          value={item.quantity || ''}
          onChange={(e) => handleChange('quantity', parseFloat(e.target.value) || 0)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          step="0.1"
        />
        <select
          value={item.unit || 'piece'}
          onChange={(e) => handleChange('unit', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="piece">Piece</option>
          <option value="kg">Kg</option>
          <option value="g">Gram</option>
          <option value="l">Liter</option>
          <option value="ml">ML</option>
          <option value="packet">Packet</option>
          <option value="box">Box</option>
        </select>
        <input
          type="number"
          placeholder="Price (₹)"
          value={item.price || ''}
          onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          step="0.01"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="flex items-center space-x-1 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        <button
          onClick={onSave}
          className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}