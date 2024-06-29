// File Path: @/components/(sections)/resume/generateResumeWithLLM.ts
const generateResumeWithLLM = async (prompt: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`Generated resume based on: ${prompt}`);
      }, 1000);
    });
  };
  
  export default generateResumeWithLLM;