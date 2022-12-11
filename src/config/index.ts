import dotenv from 'dotenv';

// Load Configuration File
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'config/.env.test' });
} else {
  dotenv.config({ path: 'config/.env' });
}

const config = {
  PORT: parseInt(process.env.PORT!, 10) || 8000,
  NODE_ENV: (process.env.NODE_ENV = process.env.NODE_ENV || 'development'),
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  CORS_WHITELIST: (process.env.CORS_WHITELIST || '').split(','),
  DATABASE: {
    URI: process.env.DATABASE_URI!,
    PASSWORD: process.env.DATABASE_PASSWORD!,
  },
};

export default config;
