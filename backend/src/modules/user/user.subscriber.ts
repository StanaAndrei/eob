import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<any> {
    await this.encryptPassword(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<any> {
    await this.encryptPassword(event.entity as User);
  }

  private async encryptPassword(user: User) {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT, 10),
    );
  }
}
