import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
// import { xai } from '@ai-sdk/xai';
import { createAzure} from "@ai-sdk/azure"
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
const azure = createAzure({
  resourceName: 'ai-kcthewizardai754464038464', // Azure resource name
  apiKey: '9j6zN4ichV3bVV7ClXfoQbYzVFTwq8aXyycvPS6VdNWnt6PnPYJTJQQJ99ALACHYHv6XJ3w3AAAAACOGyFkD',
});
export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  // : customProvider({
  //     languageModels: {
  //       'chat-model': xai('grok-2-vision-1212'),
  //       'chat-model-reasoning': wrapLanguageModel({
  //         model: xai('grok-3-mini-beta'),
  //         middleware: extractReasoningMiddleware({ tagName: 'think' }),
  //       }),
  //       'title-model': xai('grok-2-1212'),
  //       'artifact-model': xai('grok-2-1212'),
  //     },
  //     imageModels: {
  //       'small-model': xai.image('grok-2-image'),
  //     },
  //   });
  : customProvider({
    languageModels: {
      'chat-model': azure('gpt-4o-mini'),
      'chat-model-reasoning': wrapLanguageModel({
        model: azure("gpt-4o"),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model':  azure('gpt-4o-mini'),
      'artifact-model':  azure('gpt-4o-mini'),
    },
    imageModels: {
      'small-model':  azure.imageModel('dall-e-3'),
    },
  });
