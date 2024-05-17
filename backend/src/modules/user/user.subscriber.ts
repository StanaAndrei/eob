import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  LoadEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterLoad(entity: User, event?: LoadEvent<User>): void | Promise<any> {
    //entity.createdAt = new Date((entity.createdAt).toISOString().slice(0, -5));
    if (entity.isManager) {
      entity.rolePriority = 3;
    } else if (entity.isOld) {
      entity.rolePriority = 2;
    } else {
      entity.rolePriority = 1;
    }
  }

  async beforeInsert(event: InsertEvent<User>): Promise<any> {
    await this.encryptPassword(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<any> {
    const user = event.entity as User;
    for (const uc of event.updatedColumns) {
      if (uc.propertyName === 'password') {
        await this.encryptPassword(user);
      }
      if (uc.propertyName === 'buddyId' && !user.isOld) {
        user.matchDate = new Date();
      }
    }
  }

  private async encryptPassword(user: User) {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT, 10),
    );
  }
}
