import { ResumeData, ContactInfo, Experience, Education } from '../types';

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
    initialData: ResumeData;
    onUpdate: (data: ResumeData) => void;
  }

// ParsedResume.ts

export interface ParsedResume {
    name: string;
    contact_info: ContactInfo; // Changed to ContactInfo
    summary: string;
    experiences: Experience[]; // Changed to Experience[]
    education: Education[]; // Changed to Education[]
    skills: { [key: string]: string }; // Changed to object
  }