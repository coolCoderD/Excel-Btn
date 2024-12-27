
import { jsonToExcelMapping } from './excelMapping';

import * as XLSX from 'xlsx';

export const processExcelFile = async (template, data) => {
  const workbook = await loadWorkbook(template);
  
  Object.entries(jsonToExcelMapping).forEach(([sheetName, fieldMap]) => {
    const worksheet = workbook.Sheets[sheetName];
    
    Object.entries(fieldMap).forEach(([field, cellLocation]) => {
      const value = data.answers[field];
      
      if (value !== undefined) {
        if (cellLocation.includes('-')) {
          // Handle range of cells
          const [startCell, endCell] = cellLocation.split('-');
          const startRow = parseInt(startCell.substring(1));
          const endRow = parseInt(endCell.substring(1));
          
          for (let row = startRow; row <= endRow; row++) {
            const cell = `D${row}`;
            worksheet[cell] = { v: value, t: 's' };
          }
        } else {
          // Single cell update
          worksheet[cellLocation] = { v: value, t: 's' };
        }
      }
    });
  });

  return generateExcelFile(workbook);
};

const loadWorkbook = async (template) => {
  return new Promise((resolve, reject) => {
    try {
      // Use XLSX.read instead of utils.read
      const workbook = XLSX.read(template, { type: 'array' });
      resolve(workbook);
    } catch (error) {
      reject(error);
    }
  });
};

const generateExcelFile = (workbook) => {
  // Use XLSX.write instead of write
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
};