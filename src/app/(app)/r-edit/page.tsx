// ResumeEditor.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/components/(sections)/resume/types';
import { generatePDF } from '@/components/(sections)/resume/pdfGenerator/generatePDF';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ResumeEditor: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    fetch('/raw_data/resume.json')
      .then(response => response.json())
      .then(data => {
        setResumeData(data);
        setJsonInput(JSON.stringify(data, null, 2));
      })
      .catch(error => console.error('Error loading resume data:', error));
  }, []);

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value);
    try {
      const parsedData = JSON.parse(value);
      setResumeData(parsedData);
    } catch (error) {
      console.error('Invalid JSON:', error);
      // Optionally, you can set some state to show an error message to the user
    }
  };

  const handleGeneratePDF = () => {
    if (resumeData) {
      const pdfOutput = generatePDF(resumeData);
      setPdfUrl(pdfOutput);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Editor</h1>
      <Textarea
        value={jsonInput}
        onChange={(e) => handleJsonInputChange(e.target.value)}
        placeholder="Paste your JSON here"
        rows={20}
        className="w-full p-2 border rounded"
      />
      <Button
        className="mt-4"
        onClick={handleGeneratePDF}
        disabled={!resumeData}
      >
        Generate PDF
      </Button>
      {pdfUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated PDF:</h2>
          <iframe src={pdfUrl} width="100%" height="600px" />
        </div>
      )}
    </div>
  );
};

export default ResumeEditor;