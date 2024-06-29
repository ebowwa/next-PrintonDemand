// contentRender.ts
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Experience, Education, Skills } from '../types';
import { colors } from './utils';

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
    return yPos + summaryLines.length * 5; // Reduced line spacing
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
      yPos += 4; // Reduced line spacing
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(colors.light_text[0], colors.light_text[1], colors.light_text[2]);
      doc.text(`${exp.title} | ${exp.dates}`, 10, yPos);
      // Adjust the number of new lines after the title and dates
      yPos += 4; // Reduced line spacing
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.text[0], colors.text[1], colors.text[2]);
      const descLines = doc.splitTextToSize(exp.description, 180);
      doc.text(descLines, 10, yPos);
      // Adjust the number of new lines after the description
      // Increase or decrease the number of new lines by changing the value
      yPos += descLines.length * 5; // Reduced line spacing
    });
    return yPos;
  }
}

export class SkillsRenderer {
    render(doc: jsPDF, skills: Record<string, string>, yPos: number): number {
        const skillsData = Object.entries(skills).map(([skill, level]) => {
            const formattedSkill = skill.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return { formattedSkill, level };
        });

        const fontSize = 10;
        const lineHeight = 5; // Reduced line spacing
        const marginLeft = 10;
        const spaceAfterSkill = 4; // Fixed space after the skill name

        doc.setFontSize(fontSize);
        doc.setTextColor(44, 62, 80);

        let currentYPos = yPos;

        skillsData.forEach(({ formattedSkill, level }) => {
            doc.setFont("helvetica", "bold");
            doc.text(formattedSkill + ':', marginLeft, currentYPos);
            doc.setFont("helvetica", "normal");

            // Split the level text into multiple lines if necessary
            const levelLines = doc.splitTextToSize(level, doc.internal.pageSize.getWidth() - marginLeft * 2);

            // Render each line of the level text
            levelLines.forEach((line: string, index: number) => {
                doc.text(line, marginLeft + spaceAfterSkill, currentYPos + (index * lineHeight) + lineHeight);
            });

            // Update the currentYPos based on the number of lines used for the level text
            currentYPos += lineHeight * (levelLines.length + 1);
        });

        return currentYPos;
    }
}

// need to enable some type of multi-line for the level keys but not with so much extra space taken up in the section
// also the multi-line would i deally start the new line on the left hand side directly under the formatteSkill


export class EducationRenderer extends ContentRenderer {
  render(doc: jsPDF, education: Education[], yPos: number): number {
    education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0); // Blue color for institution
      doc.text(edu.institution, 10, yPos);
      yPos += 4; // Reduced line spacing
      if (edu.degree) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Blue color for degree
        doc.text(edu.degree, 10, yPos);
        yPos += 4; // Reduced line spacing
      }
      if (edu.description) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0); // Black color for description
        const descLines = doc.splitTextToSize(edu.description, 180);
        doc.text(descLines, 10, yPos);
        yPos += descLines.length * 4; // Reduced line spacing
      }
      yPos += 4; // Reduced line spacing
    });
    return yPos;
  }
}