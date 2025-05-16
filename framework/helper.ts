import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

// Function to get the current date and time in ISO format (YYYY-MM-DD_HH-MM-SS)
export function reporterDateTimeFormat() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}_${hours}-${minutes}`;
}


// Function to save or append JSON data to a file
export function saveJsonToFile(data: any, filePath: string): void {
  // Ensure the directory exists
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  let existingData: any[] = [];

  // Check if the file exists and read existing data
  if (existsSync(filePath)) {
    const fileContent = readFileSync(filePath, 'utf-8');
    try {
      existingData = JSON.parse(fileContent);
      if (!Array.isArray(existingData)) {
        throw new Error('Existing data is not an array');
      }
    } catch (error) {
      console.error('Error parsing existing JSON data:', error);
      return;
    }
  }

  // Append new data to existing data
  const combinedData = existingData.concat(data);

  // Convert combined data to JSON string
  const jsonData = JSON.stringify(combinedData, null, 2);

  // Write JSON data to the specified file
  writeFileSync(filePath, jsonData, 'utf-8');
}