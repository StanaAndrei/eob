import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './modules/user/user.entity';
import { UserSubscriber } from './modules/user/user.subscriber';

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'eob',
      logging: false,
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [User],
      subscribers: [UserSubscriber],
    };
  }
}
