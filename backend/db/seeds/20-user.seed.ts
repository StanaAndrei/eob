import { User } from '../../src/modules/user/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('ALTER TABLE users AUTO_INCREMENT=1');
    const userRepo = dataSource.getRepository(User);
    const hashedPassword = bcrypt.hashSync(
      'password',
      parseInt(process.env.BCRYPT_SALT, 10),
    );
    await userRepo.insert({
      name: 'andrew',
      email: 'andrew@gmail.com',
      password: hashedPassword,
    });
    await userRepo.insert({
      name: 'andrew2',
      email: 'andrew2@gmail.com',
      password: hashedPassword,
      createdAt: '2020-04-29 13:13:13',
      managerId: 1,
      profileId: 1,
    });
    await userRepo.insert({
      name: 'andrew3',
      email: 'andrew3@gmail.com',
      password: hashedPassword,
      createdAt: '2024-04-29 13:13:13',
      managerId: 1,
      buddyId: 2,
      //profileId: 2,
    });
  }
}
