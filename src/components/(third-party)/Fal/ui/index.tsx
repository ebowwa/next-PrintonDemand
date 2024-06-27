"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import * as fal from "@fal-ai/serverless-client";
import { ModelSelector } from './components/ModelSelector';
import { LoraManager } from './components/LoraManager';
import { AdvancedSettings } from './components/AdvancedDisplay';
import { OutputDisplay } from './components/OutputDisplay';
import { AlertDisplay } from './components/AlertDisplay';
import { Model, Lora, AlertType } from './types';
import { Result } from './types';

fal.config({
  proxyUrl: "/api/fal/proxy",
});

// Mock API calls (replace with actual API calls if available)
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

const AIModelDashboard: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [loras, setLoras] = useState<Lora[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedLoras, setSelectedLoras] = useState<Lora[]>([]);
  const [newLoraUrl, setNewLoraUrl] = useState('');
  const [alert, setAlert] = useState<AlertType | null>(null);
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
        const [fetchedModels, fetchedLoras] = await Promise.all([
          fetchModels(),
          fetchLoras()
        ]);
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
      
      const newLora: Lora = {
        id: String(loras.length + 1),
        name: `Custom Lora ${loras.length + 1}`,
        url: newLoraUrl
      };
      
      setLoras(prevLoras => [...prevLoras, newLora]);
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
      
      const result = await fal.subscribe("110602490-lora", {
        input: {
          prompt,
          model_name: selectedModel.name,
          negative_prompt: negativePrompt,
          num_inference_steps: 30,
          seed: seed === -1 ? Math.floor(Math.random() * 1000000) : seed,
          guidance_scale: temperature * 10, // Adjust as needed
          loras: selectedLoras.map(l => ({ model: l.url, scale: 0.8 })), // Adjust scale as needed
        },
        pollInterval: 5000,
        logs: true,
        onQueueUpdate(update) {
          console.log("queue update", update);
        },
      }) as Result; // Type assertion here
      
      setOutput({
        imageUrl: result.image.url,
        parameters: config
      });
      setAlert({ type: 'success', message: 'Model run completed successfully.' });
    } catch (error) {
      console.error('Error running model:', error);
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