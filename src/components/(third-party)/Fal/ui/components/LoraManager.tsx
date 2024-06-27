import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X } from 'lucide-react';
import { Lora } from '../types';

interface LoraManagerProps {
  loras: Lora[];
  selectedLoras: Lora[];
  onAddLora: () => void;
  onToggleLoraSelection: (lora: Lora) => void;
  newLoraUrl: string;
  onNewLoraUrlChange: (url: string) => void;
}

export const LoraManager: React.FC<LoraManagerProps> = ({
  loras,
  selectedLoras,
  onAddLora,
  onToggleLoraSelection,
  newLoraUrl,
  onNewLoraUrlChange
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Add Loras</label>
    <div className="flex space-x-2">
      <Input
        value={newLoraUrl}
        onChange={(e) => onNewLoraUrlChange(e.target.value)}
        placeholder="Paste Civitai Lora URL"
        className="flex-grow"
      />
      <Button onClick={onAddLora}>
        <Plus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Available Loras</label>
    <ScrollArea className="h-40 w-full border rounded-md p-2">
      {loras.map((lora) => (
        <div key={lora.id} className="flex items-center justify-between py-2">
          <span>{lora.name}</span>
          <Button
            variant={selectedLoras.some(l => l.id === lora.id) ? "secondary" : "outline"}
            size="sm"
            onClick={() => onToggleLoraSelection(lora)}
          >
            {selectedLoras.some(l => l.id === lora.id) ? 'Selected' : 'Select'}
          </Button>
        </div>
      ))}
    </ScrollArea>
    {selectedLoras.length > 0 && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Selected Loras</label>
        <div className="flex flex-wrap gap-2">
          {selectedLoras.map((lora) => (
            <Badge key={lora.id} variant="secondary" className="text-sm py-1 px-2">
              {lora.name}
              <button onClick={() => onToggleLoraSelection(lora)} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    )}
  </div>
);