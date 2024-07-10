// @/components/(third-party)/Fal/ui/api/modelAPI.tsx
// Nightly: 
// needs to import the higher level module 
export interface Model {
  id: string;
  name: string;
  type: string;
}

export interface Lora {
  id: string;
  name: string;
  url: string;
}

export const fetchModels = async (): Promise<Model[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: '1', name: 'Stable Diffusion v1.5', type: 'Text-to-Image' },
      { id: '2', name: 'Stable Diffusion v2.1', type: 'Text-to-Image' },
      { id: '3', name: 'Midjourney v5', type: 'Text-to-Image' },
    ];
  };
  
  export const fetchLoras = async (): Promise<Lora[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      { id: '1', name: 'Anime Style', url: 'https://civitai.com/api/download/models/123456' },
      { id: '2', name: 'Photorealistic', url: 'https://civitai.com/api/download/models/234567' },
      { id: '3', name: 'Cyberpunk', url: 'https://civitai.com/api/download/models/345678' },
    ];
  };