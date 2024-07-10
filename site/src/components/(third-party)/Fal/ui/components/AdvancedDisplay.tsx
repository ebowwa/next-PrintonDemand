import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdvancedSettingsProps {
  showAdvanced: boolean;
  onToggleAdvanced: () => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  negativePrompt: string;
  onNegativePromptChange: (prompt: string) => void;
  seed: number;
  onSeedChange: (seed: number) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
}

export const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  showAdvanced,
  onToggleAdvanced,
  prompt,
  onPromptChange,
  negativePrompt,
  onNegativePromptChange,
  seed,
  onSeedChange,
  temperature,
  onTemperatureChange
}) => (
  <div>
    <Button
      variant="outline"
      onClick={onToggleAdvanced}
      className="w-full justify-between"
    >
      Advanced Settings
      {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
    </Button>
    {showAdvanced && (
      <div className="space-y-4 p-4 bg-gray-50 rounded-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
          <Textarea
            value={negativePrompt}
            onChange={(e) => onNegativePromptChange(e.target.value)}
            placeholder="Enter negative prompt here"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seed (-1 for random)</label>
          <Input
            type="number"
            value={seed}
            onChange={(e) => onSeedChange(parseInt(e.target.value))}
            min={-1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature: {temperature.toFixed(2)}
          </label>
          <Slider
            value={[temperature]}
            onValueChange={([value]) => onTemperatureChange(value)}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    )}
  </div>
);