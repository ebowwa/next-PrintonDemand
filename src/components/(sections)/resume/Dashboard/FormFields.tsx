// File Path: @/components/(sections)/resume/FormFields.tsx
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResumeData } from '@/components/(sections)/resume/types';

interface FormFieldsProps {
  resume: ResumeData;
  onChange: (updatedResume: Partial<ResumeData>) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({ resume, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in resume.contact_info) {
      onChange({
        contact_info: { ...resume.contact_info, [name]: value }
      });
    } else {
      onChange({ [name]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" value={resume.name} onChange={handleInputChange} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" value={resume.contact_info.email} onChange={handleInputChange} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input type="tel" id="phone" name="phone" value={resume.contact_info.phone} onChange={handleInputChange} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input type="url" id="linkedin" name="linkedin" value={resume.contact_info.linkedin} onChange={handleInputChange} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="summary">Summary</Label>
        <Textarea id="summary" name="summary" value={resume.summary} onChange={handleInputChange} />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="experiences">Experiences</Label>
        <Textarea 
          id="experiences" 
          name="experiences" 
          value={JSON.stringify(resume.experiences, null, 2)} 
          onChange={(e) => onChange({ experiences: JSON.parse(e.target.value) })}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="education">Education</Label>
        <Textarea 
          id="education" 
          name="education" 
          value={JSON.stringify(resume.education, null, 2)} 
          onChange={(e) => onChange({ education: JSON.parse(e.target.value) })}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="skills">Skills</Label>
        <Textarea 
          id="skills" 
          name="skills" 
          value={JSON.stringify(resume.skills, null, 2)} 
          onChange={(e) => onChange({ skills: JSON.parse(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default FormFields;