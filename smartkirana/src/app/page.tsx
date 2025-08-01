'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import ExtractedData from '@/components/ExtractedData';
import InventoryList from '@/components/InventoryList';
import { InventoryItem } from '@/types';

export default function HomePage() {
  const [extractedItems, setExtractedItems] = useState<InventoryItem[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileProcessed = (items: InventoryItem[]) => {
    setExtractedItems(items);
  };

  const handleSaveToInventory = (items: InventoryItem[]) => {
    setInventory(prev => [...prev, ...items]);
    setExtractedItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Upload Bill
              </h2>
              <FileUpload 
                onFileProcessed={handleFileProcessed}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </div>

            {/* Extracted Data Section */}
            {extractedItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ExtractedData 
                  items={extractedItems}
                  onItemsUpdated={setExtractedItems}
                  onSaveToInventory={handleSaveToInventory}
                />
              </div>
            )}
          </div>

          {/* Inventory Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <InventoryList items={inventory} onItemsUpdated={setInventory} />
          </div>
        </div>
      </div>
    </div>
  );
}
