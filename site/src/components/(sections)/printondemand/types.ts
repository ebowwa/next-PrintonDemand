export interface ImageRowProps {
    id: number;
    base64Image: string;
    productListing: string;
    brand: string;
    featureBullet1: string;
    featureBullet2: string;
    productDescription: string;
    dateInfo: string;
  }

export interface ImageWithUUID {
    imageData: string;
  }

export interface AnalysisResult {
    listing: string;
    brand:string;
    bulleta: string;
    bulletb: string;
    description: string;
  }
  
export interface ImageTableProps {
    images: ImageWithUUID[];
    analysisResults: { [key: number]: AnalysisResult };
  }
  
export interface ImageCardProps {
  base64Image: string;
  index: number;
}
