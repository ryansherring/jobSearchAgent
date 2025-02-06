
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  brightdataApiKey: process.env.BRIGHTDATA_API_KEY || '',
  brightdataEndpoint: process.env.BRIGHTDATA_ENDPOINT || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  databaseUrl: process.env.DATABASE_URL || '',
};
