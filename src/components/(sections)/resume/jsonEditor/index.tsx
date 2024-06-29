// @/components/(sections)/resume/jsonEditor/index.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generatePDF } from '../pdfGenerator/generatePDF'; // Adjust the import path as necessary

const JsonEditor: React.FC = () => {
  const [jsonData, setJsonData] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setJsonData(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSaveChanges = () => {
    try {
      const data = JSON.parse(jsonData);
      const pdfDataUri = generatePDF(data);
      // Trigger download or display the PDF
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = 'resume.pdf';
      link.click();
    } catch (error) {
      console.error('Invalid JSON data', error);
      alert('Please ensure the JSON data is valid.');
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>JSON File Uploader and Editor</CardTitle>
        <CardDescription>Upload a JSON file, view and edit the contents, then save your changes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Upload JSON File</Label>
          <Input id="file" type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="json-editor">JSON Data</Label>
          <Textarea
            id="json-editor"
            placeholder="Paste or edit your JSON data here..."
            className="min-h-[200px] font-mono"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default JsonEditor;