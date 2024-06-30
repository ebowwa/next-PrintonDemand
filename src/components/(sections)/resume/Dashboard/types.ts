import { ResumeData } from '../types';

export interface FormFieldsProps {
    resume: ResumeData;
    onChange: (field: keyof ResumeData, value: any) => void;
  }

export interface AIAssistedProps {
    llmPrompt: string;
    setLlmPrompt: (prompt: string) => void;
    handleGenerate: () => void;
    generatedResume: ResumeData | null;
    isGenerating: boolean;
  }

export interface JsonEditorProps {
    value: ResumeData;
    onChange: (updatedData: ResumeData) => void;
  }

