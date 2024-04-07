import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo(): string | Function {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void | Promise<any> {}
}
