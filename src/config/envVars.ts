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
  db: {
    TYPEORM_CONNECTION: env.TYPEORM_CONNECTION || 'postgres',
    TYPEORM_HOST: env.TYPEORM_HOST || 'localhost',
    TYPEORM_PORT: Number(env.TYPEORM_PORT) || 5432,
    TYPEORM_USERNAME: env.TYPEORM_USERNAME || 'test',
    TYPEORM_PASSWORD: env.TYPEORM_PASSWORD || 'test',
    TYPEORM_DATABASE: env.TYPEORM_DATABASE || 'test',
    TYPEORM_SYNCHRONIZE: env.TYPEORM_SYNCHRONIZE === 'true',
    TYPEORM_LOGGING: env.TYPEORM_LOGGING === 'true',
    TYPEORM_ENTITIES: env.TYPEORM_ENTITIES || 'src/infrastructure/database/**/*.entity.ts',
    TYPEORM_MIGRATIONS: env.TYPEORM_MIGRATIONS || 'src/infrastructure/database/migrations/*.ts',
  },
};

export default envVars;
