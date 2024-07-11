import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import katex from 'katex';
import 'katex/dist/katex.min.css';

type Subsection = {
  title: string;
  content: string | string[];
  description: string[];
};

type Section = {
  title: string;
  subsections: Subsection[];
};

type Content = {
  title: string;
  sections: Section[];
};

const RFPoseOTEducation: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const content: Content = {
    title: "RFPose-OT: Key Concepts and Formulas",
    sections: [
      {
        title: "1. RF Signal Representation",
        subsections: [
          {
            title: "Received Signal",
            content: "s_{m,n}(t) = \\sum_{l} a_l(t) \\psi_{l,m,n}(t) \\phi_{l,m,n}(t)",
            description: [
              "s_{m,n}(t) = Received signal at receiver antenna m, frequency point n, at time t",
              "a_l(t) = Complex attenuation coefficient for path l",
              "\\psi_{l,m,n}(t) = Phase shift due to Angle of Arrival (AoA)",
              "\\phi_{l,m,n}(t) = Phase shift due to Time of Flight (ToF)"
            ]
          },
          {
            title: "Phase Shifts",
            content: [
              "AoA Phase Shift: \\psi_{l,m,n}(t) = e^{-j2\\pi f_n (m-1)d \\cos \\theta_{l,m}(t) / c}",
              "ToF Phase Shift: \\phi_{l,m,n}(t) = e^{-j2\\pi f_n \\tau_{l,m}(t)}"
            ],
            description: [
              "f_n = Frequency at point n",
              "d = Interelement distance of antenna array",
              "\\theta_{l,m}(t) = Angle of Arrival (AoA)",
              "c = Speed of light",
              "\\tau_{l,m}(t) = Time of Flight (ToF)"
            ]
          }
        ]
      },
      {
        title: "2. Pose Heatmap Generation",
        subsections: [
          {
            title: "3D Gaussian Kernel for Keypoint k",
            content: "P^{(k)}_{x,y,z} = e^{-[(x-x_{p_k})^2 + (y-y_{p_k})^2 + (z-z_{p_k})^2] / 2\\sigma^2}",
            description: [
              "P^{(k)}_{x,y,z} = Value at coordinates (x, y, z) in the heatmap for keypoint k",
              "(x_{p_k}, y_{p_k}, z_{p_k}) = 3D coordinates of keypoint k",
              "\\sigma = Standard deviation of the Gaussian kernel (controls spread)"
            ]
          }
        ]
      },
      {
        title: "3. Network Outputs",
        subsections: [
          {
            title: "Pose Embedding",
            content: "Z_p = E_P(P)",
            description: [
              "Z_p = Pose feature vector (embedding)",
              "E_P = Pose encoder network",
              "P = 3D pose heatmap"
            ]
          }
        ]
      },
      {
        title: "4. Loss Functions",
        subsections: [
          {
            title: "Optimal Transport (OT) Loss",
            content: "L_{OT} = \\int_{Z_r \\times Z_p} C(Z_r, Z_p) d\\gamma(Z_r, Z_p)",
            description: [
              "C(Z_r, Z_p) = Cost function (e.g., \\| Z_r - Z_p\\|_1)",
              "\\gamma(Z_r, Z_p) = Optimal transport plan"
            ]
          }
        ]
      },
      {
        title: "5. Evaluation Metric",
        subsections: [
          {
            title: "Spatial Location Error (SLE)",
            content: "SLE_k = \\frac{1}{U} \\sum_{u=1}^{U} \\| \\hat{p}^{(u)}_k - p^{(u)}_k \\|_2",
            description: [
              "SLE_k = SLE for keypoint k",
              "U = Number of test samples",
              "\\hat{p}^{(u)}_k = Predicted coordinates of keypoint k for sample u",
              "p^{(u)}_k = Ground truth coordinates"
            ]
          }
        ]
      }
    ]
  };

  const renderDescription = (desc: string[]) => (
    <ul className="list-disc pl-5 mt-2">
      {desc.map((item, index) => (
        <li key={index} className="text-sm">{item}</li>
      ))}
    </ul>
  );

  const renderMathContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <div key={index} className="my-2" dangerouslySetInnerHTML={{ __html: katex.renderToString(item) }} />
      ));
    }
    return <div dangerouslySetInnerHTML={{ __html: katex.renderToString(content) }} />;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Learn RFPose-OT</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>
            Explore the key concepts and formulas of RFPose-OT
          </DialogDescription>
        </DialogHeader>
        <Accordion type="single" collapsible className="w-full">
          {content.sections.map((section, sectionIndex) => (
            <AccordionItem value={`section-${sectionIndex}`} key={sectionIndex}>
              <AccordionTrigger>{section.title}</AccordionTrigger>
              <AccordionContent>
                {section.subsections.map((subsection, subsectionIndex) => (
                  <div key={subsectionIndex} className="mb-4">
                    <h4 className="font-semibold mb-2">{subsection.title}</h4>
                    <div className="pl-4">
                      {renderMathContent(subsection.content)}
                      {renderDescription(subsection.description)}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default RFPoseOTEducation;