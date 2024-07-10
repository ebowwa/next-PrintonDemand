// generatePDF.ts
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ResumeData } from '../types';
import { addSectionHeader } from './sectionHeaders';
import { SummaryRenderer, ExperienceRenderer, SkillsRenderer, EducationRenderer } from './contentRender';
import { colors } from '@/components/(sections)/resume/pdfGenerator/utils';
import { addInvisibleText } from './invisibleText';

export const generatePDF = (data: ResumeData): string => {
  const doc = new jsPDF();
  let yPos = 0;

  // Header
  doc.setFillColor(colors.background[0], colors.background[1], colors.background[2]);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text(data.name, 105, 20, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  const contactInfo = `${data.contact_info.email} | ${data.contact_info.phone} | ${data.contact_info.linkedin}`;
  doc.text(contactInfo, 105, 30, { align: 'center' });

  yPos = 35;

  // Summary
  yPos = addSectionHeader(doc, 'Professional Summary', yPos);
  yPos = new SummaryRenderer().render(doc, data.summary, yPos);

  // Experience
  yPos = addSectionHeader(doc, 'Professional Experience', yPos);
  yPos = new ExperienceRenderer().render(doc, data.experiences, yPos);

  // Skills
  yPos = addSectionHeader(doc, 'Skills', yPos);
  yPos = new SkillsRenderer().render(doc, data.skills, yPos);

  // Education
  yPos = addSectionHeader(doc, 'Education', yPos);
  yPos = new EducationRenderer().render(doc, data.education, yPos);

  // Invisible text
  addInvisibleText(doc, 10, 10);

  return doc.output('datauristring');
};