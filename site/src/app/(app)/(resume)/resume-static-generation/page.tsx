// ResumePDF.tsx
'use client';
// just shows what is stored as current json 
// updated with r-edit

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/components/(sections)/resume/types';
import { generatePDF } from '@/components/(sections)/resume/pdfGenerator/generatePDF';

const ResumePDF: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    fetch('/raw_data/resume.json')
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error loading resume data:', error));
  }, []);

  const handleGeneratePDF = () => {
    if (resumeData) {
      const pdfOutput = generatePDF(resumeData);
      setPdfUrl(pdfOutput);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Generator</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGeneratePDF}
        disabled={!resumeData}
      >
        Generate PDF
      </button>
      {pdfUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated PDF:</h2>
          <iframe src={pdfUrl} width="100%" height="600px" />
        </div>
      )}
    </div>
  );
};

export default ResumePDF;