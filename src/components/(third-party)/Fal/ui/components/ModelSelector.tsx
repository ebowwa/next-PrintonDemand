import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Model } from '../types';

interface ModelSelectorProps {
  models: Model[];
  selectedModel: Model | null;
  onModelChange: (model: Model | null) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ models, selectedModel, onModelChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Select Base Model</label>
    <Select onValueChange={(value) => onModelChange(models.find(m => m.id === value) || null)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose a model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);