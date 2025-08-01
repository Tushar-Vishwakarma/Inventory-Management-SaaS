import { ShoppingCart, Scan } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SmartKirana</h1>
              <p className="text-sm text-gray-600">Smart Inventory Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-blue-600">
            <Scan className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              Scan • Extract • Manage
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}