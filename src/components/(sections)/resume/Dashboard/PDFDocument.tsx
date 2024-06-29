// PDFDocument.tsx
"use client"
import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { SummaryRenderer, ExperienceRenderer, SkillsRenderer, EducationRenderer } from '@/components/(sections)/resume/pdfGenerator/contentRender';
import { ResumeData } from '@/components/(sections)/resume/types';
import { colors } from '@/components/(sections)/resume/pdfGenerator/utils';
//src/components/(sections)/resume/Dashboard/PDFDocument.tsx
const PDFDocument: React.FC<{ resume: ResumeData }> = ({ resume }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(resume.name, 10, yPos);
    yPos += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    doc.text(`${resume.contact_info.email} | ${resume.contact_info.phone}`, 10, yPos);
    yPos += 15;

    // Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.text('Summary', 10, yPos);
    yPos += 10;

    const summaryRenderer = new SummaryRenderer();
    yPos = summaryRenderer.render(doc, resume.summary, yPos);
    yPos += 10;

    // Experience
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.text('Experience', 10, yPos);
    yPos += 10;

    const experienceRenderer = new ExperienceRenderer();
    yPos = experienceRenderer.render(doc, resume.experiences, yPos);
    yPos += 10;

    // Education
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.text('Education', 10, yPos);
    yPos += 10;

    const educationRenderer = new EducationRenderer();
    yPos = educationRenderer.render(doc, resume.education, yPos);
    yPos += 10;

    // Skills
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
    doc.text('Skills', 10, yPos);
    yPos += 10;

    const skillsRenderer = new SkillsRenderer();
    yPos = skillsRenderer.render(doc, resume.skills, yPos);

    return doc;
  };

  return (
    <div>
      <button onClick={() => generatePDF().save('resume.pdf')}>Download PDF</button>
    </div>
  );
};

export default PDFDocument;