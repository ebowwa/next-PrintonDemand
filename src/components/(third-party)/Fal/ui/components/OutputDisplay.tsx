import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OutputDisplayProps {
  output: {
    imageUrl: string;
    parameters: {
      model: string;
      loras?: string[];
      prompt: string;
      negativePrompt?: string;
      seed: number;
      temperature: number;
    };
  };
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => (
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
            <p><strong>Loras:</strong> {output.parameters.loras ? output.parameters.loras.join(', ') : 'None'}</p>
            <p><strong>Prompt:</strong> {output.parameters.prompt}</p>
            <p><strong>Negative Prompt:</strong> {output.parameters.negativePrompt ?? 'None'}</p>
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