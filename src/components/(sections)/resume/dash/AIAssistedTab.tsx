// File Path: @/components/(sections)/resume/AIAssisted.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AIAssistedProps {
  llmPrompt: string;
  setLlmPrompt: (prompt: string) => void;
  handleGenerate: () => void;
  generatedResume: string;
  isGenerating: boolean;
}

const AIAssisted: React.FC<AIAssistedProps> = ({ llmPrompt, setLlmPrompt, handleGenerate, generatedResume, isGenerating }) => {
  return (
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="job-description">Job Description</Label>
        <Textarea 
          id="job-description" 
          placeholder="Paste the job description here..."
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="resume-upload">Upload your current resume</Label>
        <input type="file" id="resume-upload" className="w-full" />
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
  );
};

export default AIAssisted;