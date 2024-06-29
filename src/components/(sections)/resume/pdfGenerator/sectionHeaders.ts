// sectionHeaders.ts
import { jsPDF } from 'jspdf'; // Importing jsPDF library for generating PDF documents
import { colors } from './utils'; // Importing color utility for consistent styling

// Function to add a section header to the PDF document
// Parameters:
// - doc: jsPDF instance representing the PDF document
// - text: string to be displayed as the section header
// - yPos: vertical position where the section header should be placed
// Returns: updated y position after adding the section header
export const addSectionHeader = (doc: jsPDF, text: string, yPos: number): number => {
  doc.setFont('helvetica', 'bold'); // Setting font to Helvetica with bold style
  doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]); // Setting fill color using primary color from utils
  doc.setTextColor(255, 255, 255); // Setting text color to white
  doc.rect(10, yPos, 190, 10, 'F'); // Drawing a filled rectangle for the section header background
  doc.text(text.toUpperCase(), 15, yPos + 7); // Adding the section header text in uppercase
  return yPos + 15; // Returning the updated y position after adding the section header
};