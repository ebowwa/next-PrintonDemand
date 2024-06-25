// src/components/(sections)/printondemand/ImageTable/kit/WordArt.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fonts = [
  'Arial', 'Verdana', 'Times New Roman', 'Courier', 'Georgia',
  'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS',
  'Arial Black', 'Impact'
];

const WordArtCustomizer: React.FC<{
  selectedText: string;
  font: string;
  fontSize: number;
  onFontChange: (font: string) => void;
  onFontSizeChange: (size: number) => void;
  onDownload: () => void;
}> = ({ selectedText, font, fontSize, onFontChange, onFontSizeChange, onDownload }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4 mb-4">
          <Select onValueChange={onFontChange} value={font}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="space-y-2">
            <Slider
              min={12}
              max={72}
              step={1}
              value={[fontSize]}
              onValueChange={(value: number[]) => onFontSizeChange(value[0])}
            />
            <div className="text-center">{fontSize}px</div>
          </div>
        </div>
        
        <Button onClick={onDownload} disabled={!selectedText} className="w-full">
          Download as PNG
        </Button>
      </CardContent>
    </Card>
  );
};

const WordArtDisplay: React.FC<{
  text: string;
  font: string;
  fontSize: number;
}> = ({ text, font, fontSize }) => {
  return (
    <Card className="my-4">
      <CardContent>
        <div
          className="text-center p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          style={{ fontFamily: font, fontSize: `${fontSize}px` }}
        >
          {text || "Select any text on the page to see word art"}
        </div>
      </CardContent>
    </Card>
  );
};

const WordArtComponent: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');
  const [wordArtFont, setWordArtFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(48);
  const wordArtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== '') {
        setSelectedText(selection.toString().trim());
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleDownload = () => {
    if (wordArtRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 4500;
      canvas.height = 4500;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `${fontSize * 3}px ${wordArtFont}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'purple');
        gradient.addColorStop(0.5, 'pink');
        gradient.addColorStop(1, 'red');
        ctx.fillStyle = gradient;
        
        ctx.fillText(selectedText, canvas.width / 2, canvas.height / 2);
        
        const link = document.createElement('a');
        link.download = 'word-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" ref={wordArtRef}>
      <WordArtDisplay text={selectedText} font={wordArtFont} fontSize={fontSize} />
      <WordArtCustomizer
        selectedText={selectedText}
        font={wordArtFont}
        fontSize={fontSize}
        onFontChange={setWordArtFont}
        onFontSizeChange={setFontSize}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default WordArtComponent;