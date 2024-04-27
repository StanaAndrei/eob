import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './modules/user/user.entity';
import { UserSubscriber } from './modules/user/user.subscriber';
import { Profile } from './modules/profile/profile.entity';

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
      entities: [User, Profile],
      subscribers: [UserSubscriber],
    };
  }
}
