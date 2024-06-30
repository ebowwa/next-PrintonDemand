// @/components/(sections)/resume/jsonEditor/index.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generatePDF } from '../pdfGenerator/generatePDF'; // Adjust the import path as necessary
import { ResumeData, ContactInfo, Experience, Education } from '../types';

const JsonEditor: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    fetch('/raw_data/resume.json')
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error loading resume data:', error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string, index?: number, subField?: string) => {
    const { value } = event.target;
    setResumeData(prevData => {
      if (!prevData) return null;
      const newData = { ...prevData };
      if (field === 'experiences' && typeof index === 'number') {
        newData[field][index][subField as keyof Experience] = value;
      } else if (field === 'education' && typeof index === 'number') {
        newData[field][index][subField as keyof Education] = value;
      } else if (field === 'contact_info' && subField) {
        newData[field][subField as keyof ContactInfo] = value;
      } else if (field in newData) {
        (newData as any)[field] = value;
      }
      return newData;
    });
  };

  const handleSaveChanges = () => {
    if (!resumeData) return;
    const pdfDataUri = generatePDF(resumeData);
    // Trigger download or display the PDF
    const link = document.createElement('a');
    link.href = pdfDataUri;
    link.download = 'resume.pdf';
    link.click();
  };

  if (!resumeData) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>JSON File Editor</CardTitle>
        <CardDescription>Edit the JSON data using form fields.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={resumeData.name} onChange={(e) => handleInputChange(e, 'name')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Input id="summary" value={resumeData.summary} onChange={(e) => handleInputChange(e, 'summary')} />
        </div>
        <div className="space-y-2">
          <Label>Contact Info</Label>
          <div className="space-y-2">
            <Input placeholder="Email" value={resumeData.contact_info.email} onChange={(e) => handleInputChange(e, 'contact_info', undefined, 'email')} />
            <Input placeholder="Phone" value={resumeData.contact_info.phone} onChange={(e) => handleInputChange(e, 'contact_info', undefined, 'phone')} />
            <Input placeholder="LinkedIn" value={resumeData.contact_info.linkedin} onChange={(e) => handleInputChange(e, 'contact_info', undefined, 'linkedin')} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Experiences</Label>
          {resumeData.experiences.map((experience, index) => (
            <div key={index} className="space-y-2">
              <Input placeholder="Company" value={experience.company} onChange={(e) => handleInputChange(e, 'experiences', index, 'company')} />
              <Input placeholder="Title" value={experience.title} onChange={(e) => handleInputChange(e, 'experiences', index, 'title')} />
              <Input placeholder="Dates" value={experience.dates} onChange={(e) => handleInputChange(e, 'experiences', index, 'dates')} />
              <Input placeholder="Description" value={experience.description} onChange={(e) => handleInputChange(e, 'experiences', index, 'description')} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Label>Education</Label>
          {resumeData.education.map((education, index) => (
            <div key={index} className="space-y-2">
              <Input placeholder="Institution" value={education.institution} onChange={(e) => handleInputChange(e, 'education', index, 'institution')} />
              <Input placeholder="Degree" value={education.degree || ''} onChange={(e) => handleInputChange(e, 'education', index, 'degree')} />
              <Input placeholder="Description" value={education.description || ''} onChange={(e) => handleInputChange(e, 'education', index, 'description')} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveChanges} disabled={!resumeData}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default JsonEditor;