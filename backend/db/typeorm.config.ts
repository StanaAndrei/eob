import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

const configService = new ConfigService();

export const dsoAndSo: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: 'eob',
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  //synchronize: configService.get('nodenv') === 'development',
  logging: configService.get('nodenv') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  seeds: [`db/seeds/*.seed.ts`],
  namingStrategy: new SnakeNamingStrategy(),
  seedTracking: false,
};

export default new DataSource(dsoAndSo);
