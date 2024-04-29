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
    const userRepo = dataSource.getRepository(User);
    await userRepo.insert({
      name: 'andrew',
      email: 'andrew@gmail.com',
      password: bcrypt.hashSync(
        'password',
        parseInt(process.env.BCRYPT_SALT, 10),
      ),
      isManager: true,
    }); //*/
  }
}
