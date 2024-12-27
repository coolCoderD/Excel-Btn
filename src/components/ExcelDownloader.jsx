import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { processExcelFile } from '../utils/excelProcessor';

export const ExcelDownloader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from Firebase
      const docRef = doc(db, 'users', 'iY5AOYW4EBVaREg0FpL5jJrbkRs1', 'projects', 'fMoPuoQAvoYbyCUiC78E');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('No document found!');
      }

      // Fetch template file
      const templateResponse = await fetch('/latest.xlsm');

      const templateBuffer = await templateResponse.arrayBuffer();

      // Process the Excel file
      const processedFile = await processExcelFile(templateBuffer, docSnap.data());

      // Create download
      const blob = new Blob([processedFile], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `final_result_${timestamp}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
      >
        <Download size={20} />
        {loading ? 'Processing...' : 'Download Excel'}
      </button>
      
      {error && (
        <p className="text-red-600 text-sm">
          Error: {error}
        </p>
      )}
    </div>
  );
};