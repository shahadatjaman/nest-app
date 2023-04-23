import { Injectable } from '@nestjs/common';
import {  OpenAIApi,Configuration } from "openai";

@Injectable()
export class ImageGenerationService {

    async getAvatar(text : string) : Promise<any> {
     console.log(text)
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createImage({
            prompt: text,
            n: 1,
            size: "1024x1024",
          });
         const image_url = response.data.data[0].url;
        return image_url
    }
}
