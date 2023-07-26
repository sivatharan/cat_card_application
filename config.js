import dotEnv from 'dotenv'
dotEnv.config();
export const BASE_URL = process.env.BASE_URL || '';