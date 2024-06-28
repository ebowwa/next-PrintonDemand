// types.ts

export interface ContactInfo {
    email: string;
    phone: string;
    linkedin: string;
  }
  
  export interface Experience {
    company: string;
    title: string;
    dates: string;
    description: string;
  }
  
  export interface Skills {
    [skill: string]: string;
  }

  export interface Education {
    institution: string;
    degree?: string;
    description?: string;
  }
  
  export interface ResumeData {
    name: string;
    contact_info: ContactInfo;
    summary: string;
    experiences: Experience[];
    skills: { [key: string]: string };
    education: Education[];
  }