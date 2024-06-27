// File Path: @/components/(sections)/resume/index.tsx
// Nightly Notes:
// pdf ui is mostly ugly, i kinda like it but just the simplicity of it
// probably should modularize this then scale
"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 5 },
  text: { fontSize: 12, marginBottom: 5 },
});

// PDF Document component
const PDFDocument: React.FC<{ resume: { name: string, email: string, phone: string, summary: string, experience: string, education: string, skills: string } }> = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{resume.name}</Text>
        <Text style={styles.text}>{resume.email} | {resume.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Summary</Text>
        <Text style={styles.text}>{resume.summary}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Experience</Text>
        <Text style={styles.text}>{resume.experience}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Education</Text>
        <Text style={styles.text}>{resume.education}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Skills</Text>
        <Text style={styles.text}>{resume.skills}</Text>
      </View>
    </Page>
  </Document>
);

// This is a mock function to simulate LLM generation
const generateResumeWithLLM = async (prompt: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Generated resume based on: ${prompt}`);
    }, 1000);
  });
};

const ResumeGenerator: React.FC = () => {
  const [manualResume, setManualResume] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
  });

  const [llmPrompt, setLlmPrompt] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setManualResume(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateResumeWithLLM(llmPrompt);
      setGeneratedResume(result);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const parseGeneratedResume = () => {
    // This is a simple parser. In a real application, you'd want a more robust solution.
    const lines = generatedResume.split('\n');
    return {
      name: lines[0] || '',
      email: lines[1]?.split('|')[0]?.trim() || '',
      phone: lines[1]?.split('|')[1]?.trim() || '',
      summary: lines.slice(2).join('\n') || '',
      experience: '',
      education: '',
      skills: '',
    };
  };

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
          </TabsList>
          <TabsContent value="manual">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" value={manualResume.name} onChange={handleManualChange} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" value={manualResume.email} onChange={handleManualChange} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input type="tel" id="phone" name="phone" value={manualResume.phone} onChange={handleManualChange} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" value={manualResume.summary} onChange={handleManualChange} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="experience">Experience</Label>
                <Textarea id="experience" name="experience" value={manualResume.experience} onChange={handleManualChange} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="education">Education</Label>
                <Textarea id="education" name="education" value={manualResume.education} onChange={handleManualChange} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="skills">Skills</Label>
                <Textarea id="skills" name="skills" value={manualResume.skills} onChange={handleManualChange} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="llm">
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="llm-prompt">Describe your background and desired resume</Label>
                <Textarea 
                  id="llm-prompt" 
                  value={llmPrompt} 
                  onChange={(e) => setLlmPrompt(e.target.value)}
                  placeholder="E.g., I'm a software engineer with 5 years of experience in React and Node.js. I'm looking for a senior developer position..."
                />
              </div>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Resume'}
              </Button>
              {generatedResume && (
                <div className="mt-4">
                  <Label>Generated Resume</Label>
                  <Textarea value={generatedResume} readOnly className="mt-2" rows={10} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {typeof window !== 'undefined' && (
          <PDFDownloadLink
            document={<PDFDocument resume={generatedResume ? parseGeneratedResume() : manualResume} />}
            fileName="resume.pdf"
          >
            {({ blob, url, loading, error }) => 
              <Button disabled={loading}>
                {loading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            }
          </PDFDownloadLink>
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeGenerator;