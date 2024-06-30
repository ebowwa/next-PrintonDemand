"use client";
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import * as fal from "@fal-ai/serverless-client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

// Mock API calls (replace with actual API calls)
const fetchModels = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', name: 'Stable Diffusion v1.5', type: 'Text-to-Image' },
    { id: '2', name: 'Stable Diffusion v2.1', type: 'Text-to-Image' },
    { id: '3', name: 'Midjourney v5', type: 'Text-to-Image' },
  ];
};

const fetchLoras = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: '1', name: 'Anime Style', url: 'https://civitai.com/api/download/models/123456' },
    { id: '2', name: 'Photorealistic', url: 'https://civitai.com/api/download/models/234567' },
    { id: '3', name: 'Cyberpunk', url: 'https://civitai.com/api/download/models/345678' },
  ];
};

interface Model {
  id: string;
  name: string;
  type: string;
}

interface Lora {
  id: string;
  name: string;
  url: string;
}

interface Alert {
  type: 'error' | 'success';
  message: string;
}

interface FalResult {
  images: { url: string }[];
}

const ModelSelector = ({ models, selectedModel, onModelChange }: { models: Model[], selectedModel: Model | null, onModelChange: (model: Model | null) => void }) => (
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

const LoraManager = ({ loras, selectedLoras, onAddLora, onToggleLoraSelection, newLoraUrl, onNewLoraUrlChange }: { loras: Lora[], selectedLoras: Lora[], onAddLora: () => void, onToggleLoraSelection: (lora: Lora) => void, newLoraUrl: string, onNewLoraUrlChange: (url: string) => void }) => (
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

const AdvancedSettings = ({ showAdvanced, onToggleAdvanced, prompt, onPromptChange, negativePrompt, onNegativePromptChange, seed, onSeedChange, temperature, onTemperatureChange }: { showAdvanced: boolean, onToggleAdvanced: () => void, prompt: string, onPromptChange: (prompt: string) => void, negativePrompt: string, onNegativePromptChange: (negativePrompt: string) => void, seed: number, onSeedChange: (seed: number) => void, temperature: number, onTemperatureChange: (temperature: number) => void }) => (
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

const OutputDisplay = ({ output }: { output: { imageUrl: string; parameters: any } }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Generated Output</CardTitle>
    </CardHeader>
    <CardContent>
      <img src={output.imageUrl} alt="Generated image" className="w-full h-auto mb-4 rounded-md" />
      <Tabs defaultValue="parameters">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>
        <TabsContent value="parameters">
          <div className="space-y-2">
            <p><strong>Model:</strong> {output.parameters.model}</p>
            <p><strong>Loras:</strong> {output.parameters.loras.join(', ') || 'None'}</p>
            <p><strong>Prompt:</strong> {output.parameters.prompt}</p>
            <p><strong>Negative Prompt:</strong> {output.parameters.negativePrompt || 'None'}</p>
            <p><strong>Seed:</strong> {output.parameters.seed}</p>
            <p><strong>Temperature:</strong> {output.parameters.temperature}</p>
          </div>
        </TabsContent>
        <TabsContent value="json">
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            {JSON.stringify(output.parameters, null, 2)}
          </pre>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

const AlertDisplay = ({ alert }: { alert: Alert | null }) => (
  alert && (
    <Alert variant={alert.type === 'error' ? 'destructive' : 'default'}>
      <AlertDescription>{alert.message}</AlertDescription>
    </Alert>
  )
);

const AIModelDashboard = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loras, setLoras] = useState<Lora[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedLoras, setSelectedLoras] = useState<Lora[]>([]);
  const [newLoraUrl, setNewLoraUrl] = useState('');
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [seed, setSeed] = useState(-1);
  const [temperature, setTemperature] = useState(0.7);
  const [output, setOutput] = useState<{ imageUrl: string; parameters: any } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [fetchedModels, fetchedLoras] = await Promise.all([fetchModels(), fetchLoras()]);
        setModels(fetchedModels);
        setLoras(fetchedLoras);
      } catch (error) {
        setAlert({ type: 'error', message: 'Failed to load data. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddLora = () => {
    if (newLoraUrl) {
      if (!newLoraUrl.startsWith('https://civitai.com/api/download/models/')) {
        setAlert({ type: 'error', message: 'Invalid Civitai URL. Please enter a valid Civitai model download URL.' });
        return;
      }
      
      const newLora = {
        id: String(loras.length + 1),
        name: `Custom Lora ${loras.length + 1}`,
        url: newLoraUrl
      };
      
      setLoras([...loras, newLora]);
      setNewLoraUrl('');
      setAlert({ type: 'success', message: 'Custom Lora added successfully' });
    }
  };

  const toggleLoraSelection = (lora: Lora) => {
    setSelectedLoras(prev => 
      prev.some(l => l.id === lora.id)
        ? prev.filter(l => l.id !== lora.id)
        : [...prev, lora]
    );
  };

  const handleRunModel = async () => {
    if (!selectedModel) {
      setAlert({ type: 'error', message: 'Please select a base model before running.' });
      return;
    }
    
    if (!prompt) {
      setAlert({ type: 'error', message: 'Please enter a prompt before running the model.' });
      return;
    }

    setIsLoading(true);
    try {
      const config = {
        model: selectedModel.name,
        loras: selectedLoras.map(l => l.name),
        prompt,
        negativePrompt,
        seed: seed === -1 ? 'random' : seed,
        temperature
      };
      
      const result: FalResult = await fal.subscribe("549750", {
        input: {
          prompt,
          model_name: selectedModel.name,
          image_size: "square_hd",
        },
        pollInterval: 5000,
        logs: true,
        onQueueUpdate(update) {
          console.log("queue update", update);
        },
      });
      
      setOutput({
        imageUrl: result.images[0].url,
        parameters: config
      });
      setAlert({ type: 'success', message: 'Model run completed successfully.' });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to run the model. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>AI Model Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ModelSelector models={models} selectedModel={selectedModel} onModelChange={setSelectedModel} />
            <LoraManager
              loras={loras}
              selectedLoras={selectedLoras}
              onAddLora={handleAddLora}
              onToggleLoraSelection={toggleLoraSelection}
              newLoraUrl={newLoraUrl}
              onNewLoraUrlChange={setNewLoraUrl}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                rows={3}
              />
            </div>
            <AdvancedSettings
              showAdvanced={showAdvanced}
              onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
              prompt={prompt}
              onPromptChange={setPrompt}
              negativePrompt={negativePrompt}
              onNegativePromptChange={setNegativePrompt}
              seed={seed}
              onSeedChange={setSeed}
              temperature={temperature}
              onTemperatureChange={setTemperature}
            />
            <Button onClick={handleRunModel} className="w-full" disabled={isLoading || !selectedModel || !prompt}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Image'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && <OutputDisplay output={output} />}
      <AlertDisplay alert={alert} />
    </div>
  );
};

export default AIModelDashboard;