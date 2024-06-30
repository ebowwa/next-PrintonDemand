import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';
import FormFields from '@/components/(sections)/resume/Dashboard/FormFields';
import AIAssisted from '@/components/(sections)/resume/Dashboard/AIAssistedTab';
import PDFDocument from '@/components/(sections)/resume/Dashboard/PDFDocument';
import generateResumeWithLLM from '@/components/(sections)/resume/Dashboard/Assistant';
import { ResumeData } from './types';

// Placeholder for the missing module
const parseGeneratedResume = (data: any): ResumeData => {
  // Implement the parsing logic here
  return data as ResumeData;
};

const JsonEditor = dynamic(() => import('./jsonEditor'), { ssr: false });

const ResumeGenerator: React.FC = () => {
  const [manualResume, setManualResume] = useState<ResumeData>({
    name: '',
    contact_info: {
      email: '',
      phone: '',
      linkedin: '',
    },
    summary: '',
    experiences: [],
    education: [],
    skills: {},
  });

  const [llmPrompt, setLlmPrompt] = useState('');
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleManualChange = (updatedResume: Partial<ResumeData>) => {
    setManualResume(prev => ({ ...prev, ...updatedResume }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateResumeWithLLM(llmPrompt);
      const parsedResume = parseGeneratedResume(result);
      setGeneratedResume(parsedResume);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Resume Generator</CardTitle>
        <CardDescription>Create your resume manually or use AI assistance, then export to PDF</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Manual Input</TabsTrigger>
            <TabsTrigger value="llm">AI Assisted</TabsTrigger>
            <TabsTrigger value="json">JSON Editor</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">
            <FormFields resume={manualResume} onChange={handleManualChange} />
          </TabsContent>
          <TabsContent value="llm">
            <AIAssisted
              llmPrompt={llmPrompt}
              setLlmPrompt={setLlmPrompt}
              handleGenerate={handleGenerate}
              generatedResume={generatedResume ? JSON.stringify(generatedResume) : ''}
              isGenerating={isGenerating}
            />
          </TabsContent>
          <TabsContent value="json">
            <JsonEditor
              value={JSON.stringify(manualResume, null, 2)}
              onChange={(value: string) => {
                try {
                  const parsedData = JSON.parse(value);
                  setManualResume(parsedData);
                } catch (error) {
                  console.error('Invalid JSON:', error);
                }
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <PDFDownloadLink
          document={<PDFDocument resume={generatedResume || manualResume} />}
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }) => 
            <Button disabled={loading}>
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          }
        </PDFDownloadLink>
      </CardFooter>
    </Card>
  );
};

export default ResumeGenerator;