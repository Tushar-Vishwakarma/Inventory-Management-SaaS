export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category?: string;
  dateAdded: string;
  expiryDate?: string;
  brand?: string;
  description?: string;
}

export interface BillData {
  storeName?: string;
  billNumber?: string;
  date?: string;
  items: InventoryItem[];
  total?: number;
}

export interface OCRResponse {
  text: string;
  confidence: number;
}

export interface FileUploadProps {
  onFileProcessed: (items: InventoryItem[]) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export interface ExtractedDataProps {
  items: InventoryItem[];
  onItemsUpdated: (items: InventoryItem[]) => void;
  onSaveToInventory: (items: InventoryItem[]) => void;
}

export interface InventoryListProps {
  items: InventoryItem[];
  onItemsUpdated: (items: InventoryItem[]) => void;
}