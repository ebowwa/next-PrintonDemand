// src/components/(third-party)/Fal/config.ts
import * as fal from '@fal-ai/serverless-client';

fal.config({
  proxyUrl: '/api/fal/proxy', // the built-int nextjs proxy
});