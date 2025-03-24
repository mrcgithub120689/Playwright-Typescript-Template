import dotenv from 'dotenv';
import * as path from 'path';
import config from '../config.json';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// const requiredEnvVars = ['USERNAME', 'PASSWORD'];
// requiredEnvVars.forEach((varName) => {
//   console.log(`Checking ${varName}:`, process.env[varName]);
//   if (!process.env[varName]) {
//     console.error(`Environment variable ${varName} is required but not set.`);
//     throw new Error(`Environment variable ${varName} is required but not set.`);
//   }
// });

// Determine the current environment
const currentEnv = process.env.ENV || 'sit';

// Export environment-specific and common configurations
export const configEnv = config[currentEnv];
export const configCommon = config["common"];