// src/utils/logger.ts

class Logger {
    static log(level: string, message: string, data?: any) {
      const timestamp = new Date().toISOString();
      if (data) {
        console.log(`[${timestamp}] [${level.toUpperCase()}] - ${message}`, data);
      } else {
        console.log(`[${timestamp}] [${level.toUpperCase()}] - ${message}`);
      }
    }
  
    static debug(message: string, data?: any) {
      this.log('debug', message, data);
    }
  
    static info(message: string, data?: any) {
      this.log('info', message, data);
    }
  
    static warn(message: string, data?: any) {
      this.log('warn', message, data);
    }
  
    static error(message: string, data?: any) {
      this.log('error', message, data);
    }
  }
  
  export { Logger };
  