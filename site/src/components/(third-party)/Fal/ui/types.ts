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
  
  export interface AlertType {
    type: 'error' | 'success';
    message: string;
  }
  
  export type Image = {
    url: string;
    file_name: string;
    file_size: number;
  };

  export type Result = {
    image: Image;
  };