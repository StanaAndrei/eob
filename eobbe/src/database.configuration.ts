import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'eob',
      //entities: [process.env.TYPEORM_ENTITIES],
      logging: true,
      synchronize: false,
      //migrations: [process.env.TYPEORM_MIGRATIONS],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
