import dotenv from 'dotenv';

dotenv.config();

const { env } = process;

const envVars = {
  application: {
    NODE_ENV: env.NODE_ENV || 'development',
    APP_PORT: env.APP_PORT || 3000,
    CSV_MINIMUM_SIZE: Number(env.CSV_MINIMUM_SIZE) || 1000,
  },
  aws: {
    AWS_S3_BUCKET: env.AWS_S3_BUCKET || 'siena-challenge',
    AWS_REGION: env.AWS_REGION || 'us-east-1',
    AWS_S3_HOST: env.AWS_S3_HOST || '',
  },
};

export default envVars;
