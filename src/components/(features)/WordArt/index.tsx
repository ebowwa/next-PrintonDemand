// @/components/(features)/WordArt/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { fonts } from "./fonts";

const WordArtDisplay: React.FC<{
  text: string;
  font: string;
  fontSize: number;
  color: string;
}> = ({ text, font, fontSize, color }) => {
  return (
    <div
      className="text-center p-4 mb-4"
      style={{ fontFamily: font, fontSize: `${fontSize}px`, color: color }}
    >
      {text || "Select any text on the page to see word art"}
    </div>
  );
};

const WordArt: React.FC = () => {
  const [selectedText, setSelectedText] = useState('');
  const [wordArtFont, setWordArtFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#FF00FF'); // Default color: magenta
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wordArtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim() !== '') {
        setSelectedText(selection.toString().trim());
        setIsModalOpen(true);
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
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `${fontSize * 3}px ${wordArtFont}`;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(selectedText, canvas.width / 2, canvas.height / 2);
        
        const link = document.createElement('a');
        link.download = 'word-art.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div ref={wordArtRef}>
            <WordArtDisplay text={selectedText} font={wordArtFont} fontSize={fontSize} color={color} />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="font-select">Font</Label>
              <Select onValueChange={setWordArtFont} value={wordArtFont}>
                <SelectTrigger id="font-select">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
              <Slider
                id="font-size"
                min={12}
                max={72}
                step={1}
                value={[fontSize]}
                onValueChange={(value: number[]) => setFontSize(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color-select">Color</Label>
              <Input
                id="color-select"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 p-1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-color-select">Background Color</Label>
              <Select onValueChange={setBackgroundColor} value={backgroundColor}>
                <SelectTrigger id="background-color-select">
                  <SelectValue placeholder="Select background color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transparent">Transparent</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="#FF00FF">Magenta</SelectItem>
                  <SelectItem value="#00FF00">Green</SelectItem>
                  <SelectItem value="#0000FF">Blue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleDownload} className="w-full mt-4">
              Download as PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WordArt;