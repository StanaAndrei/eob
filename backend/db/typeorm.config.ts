import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';

config();

const configService = new ConfigService();

const dsOpts: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: 'eob',
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.get('nodenv') === 'development',
  logging: configService.get('nodenv') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  seeds: [`${__dirname}/seeds/*{.js,.ts}`],
  seedTracking: false,
};

export default new DataSource(dsOpts);
