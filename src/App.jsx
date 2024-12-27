import React from 'react';
import { ExcelDownloader } from './components/ExcelDownloader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Excel File Processor</h1>
        <ExcelDownloader />
      </div>
    </div>
  );
}

export default App;