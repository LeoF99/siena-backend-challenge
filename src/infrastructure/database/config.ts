import envVars from '../../config/envVars';

export default {
  type: envVars.db.TYPEORM_CONNECTION as any,
  host: envVars.db.TYPEORM_HOST,
  username: envVars.db.TYPEORM_USERNAME,
  password: envVars.db.TYPEORM_PASSWORD,
  database: envVars.db.TYPEORM_DATABASE,
  port: +envVars.db.TYPEORM_PORT,
  synchronize: envVars.db.TYPEORM_SYNCHRONIZE,
  entities: [envVars.db.TYPEORM_ENTITIES],
  logging: envVars.db.TYPEORM_LOGGING,
  supportBigNumbers: true,
};
