# SmartKirana - Smart Inventory Management

A modern, mobile-first web application designed for small retail (kirana) store owners to efficiently manage their inventory by scanning purchase bills and extracting item data using OCR technology.

## 🚀 Features

### 📱 Mobile-First Design
- Responsive web app that works seamlessly on mobile devices and desktop
- Progressive Web App (PWA) support - installable on mobile devices
- Touch-friendly interface optimized for kirana store owners

### 📄 Bill Scanning & OCR
- **Drag & Drop File Upload**: Easy upload for images (JPEG, PNG, GIF, BMP) and PDF files
- **Free OCR Integration**: Uses OCR.space API for text extraction from bills
- **Smart Text Parsing**: Automatically extracts item names, quantities, units, and prices
- **Fallback Support**: Mock data generation when OCR service is unavailable

### ✏️ Data Management
- **Editable Extraction**: Review and edit extracted data before saving
- **Manual Entry**: Add items manually or supplement OCR results
- **Category Auto-Assignment**: Intelligent categorization of grocery items
- **Flexible Units**: Support for kg, grams, liters, pieces, packets, boxes

### 📊 Inventory Features
- **Local Storage**: Data persisted in browser's local storage
- **Search & Filter**: Find items by name, filter by category
- **Sorting Options**: Sort by name, date, price, or quantity
- **Statistics Dashboard**: Total items, inventory value, category count
- **CSV Export**: Download inventory data as spreadsheet

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **UI Components**: Lucide React icons, Headless UI
- **File Upload**: React Dropzone
- **OCR Service**: OCR.space API (free tier)
- **PWA**: Manifest.json for mobile app experience

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone and setup**:
```bash
cd smartkirana
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📱 How to Use

### 1. Upload a Bill
- Click the upload area or drag & drop your bill image/PDF
- Supported formats: JPEG, PNG, GIF, BMP, PDF (max 10MB)
- Wait for OCR processing to complete

### 2. Review Extracted Data
- Check automatically extracted items, quantities, and prices
- Edit any incorrect information
- Add missing items manually
- Assign appropriate categories

### 3. Save to Inventory
- Click "Save to Inventory" to add items to your stock
- Items are automatically saved to local storage

### 4. Manage Inventory
- Use search to find specific items
- Filter by category or sort by various criteria
- Export data as CSV for external use
- Delete items when sold or expired

## 🎯 Target Users

Perfect for:
- **Kirana Store Owners**: Small grocery store operators
- **Retail Shop Managers**: Local retail business owners
- **Small Business Owners**: Anyone managing physical inventory
- **Vendors & Traders**: Market vendors tracking stock

## 🔧 Configuration

### OCR API Setup
The app uses OCR.space's free API with the "helloworld" key for demonstration. For production use:

1. Sign up at [OCR.space](https://ocr.space/ocrapi)
2. Get your free API key
3. Replace the API key in `src/components/FileUpload.tsx`

### Categories Customization
Edit the categories in `src/components/ExtractedData.tsx` to match your inventory needs.

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the 'out' folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload the 'out' folder to your web server
```

## 🔒 Privacy & Security

- **Local Storage**: All inventory data is stored locally in your browser
- **No Account Required**: No sign-up or personal data collection
- **OCR Processing**: Images are processed by OCR.space API (check their privacy policy)
- **Offline Ready**: Core functionality works without internet (except OCR)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support, feature requests, or bug reports:
- Create an issue on GitHub
- Contact: [your-email@example.com]

## 🎉 Acknowledgments

- [OCR.space](https://ocr.space/) for free OCR API
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the amazing framework

---

**SmartKirana** - Making inventory management smart and simple for small businesses! 🏪✨
