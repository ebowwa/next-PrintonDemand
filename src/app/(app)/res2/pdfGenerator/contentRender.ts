// contentRenderer.ts
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Experience, Education, Skills } from '../types';
import { colors } from '../pdfGenerator/utils';

abstract class ContentRenderer {
  abstract render(doc: jsPDF, data: any, yPos: number): number;
}

export class SummaryRenderer extends ContentRenderer {
  render(doc: jsPDF, summary: string, yPos: number): number {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
    const summaryLines = doc.splitTextToSize(summary, 180);
    doc.text(summaryLines, 10, yPos);
    // Adjust the number of new lines after the summary
    // Increase or decrease the number of new lines by changing the value
    return yPos + summaryLines.length * 4;
  }
}

export class ExperienceRenderer extends ContentRenderer {
  render(doc: jsPDF, experiences: Experience[], yPos: number): number {
    experiences.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
      doc.text(exp.company, 10, yPos);
      // Adjust the number of new lines after the company name
      yPos += 5;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(colors.light_text[0], colors.light_text[1], colors.light_text[2]);
      doc.text(`${exp.title} | ${exp.dates}`, 10, yPos);
      // Adjust the number of new lines after the title and dates
      yPos += 5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      const descLines = doc.splitTextToSize(exp.description, 180);
      doc.text(descLines, 10, yPos);
      // Adjust the number of new lines after the description
      // Increase or decrease the number of new lines by changing the value
      yPos += descLines.length * 6;
    });
    return yPos;
  }
}

export class SkillsRenderer {
    render(doc: jsPDF, skills: Skills, yPos: number): number {
      const skillsData = Object.entries(skills).map(([skill, level]) => {
        const formattedSkill = skill.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return { formattedSkill, level };
      });
  
      const fontSize = 10;
      const lineHeight = 6;
      const marginLeft = 10;
  
      doc.setFontSize(fontSize);
      doc.setTextColor(44, 62, 80);
  
      let currentYPos = yPos;
  
      skillsData.forEach(({ formattedSkill, level }) => {
        doc.setFont("helvetica", "bold");
        doc.text(formattedSkill, marginLeft, currentYPos);
        doc.setFont("helvetica", "normal");
        const skillWidth = doc.getTextWidth(formattedSkill);
        const maxWidth = doc.internal.pageSize.getWidth() - marginLeft * 2;
  
        const lines = doc.splitTextToSize(`: ${level}`, maxWidth - skillWidth);
        lines.forEach((line: string, lineIndex: number) => {
          doc.text(line, marginLeft + skillWidth, currentYPos + lineIndex * lineHeight);
        });
  
        currentYPos += lines.length * lineHeight;
      });
  
      return currentYPos + lineHeight;
    }
  }
  
export class EducationRenderer extends ContentRenderer {
  render(doc: jsPDF, education: Education[], yPos: number): number {
    education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(edu.institution, 10, yPos);
      yPos += 5;
      if (edu.degree) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.text(edu.degree, 10, yPos);
        yPos += 5;
      }
      if (edu.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const descLines = doc.splitTextToSize(edu.description, 180);
        doc.text(descLines, 10, yPos);
        yPos += descLines.length * 5;
      }
      yPos += 5;
    });
    return yPos;
  }
}