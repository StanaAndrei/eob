import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { FEProfile } from '../../src/modules/profile/subprofiles/feprofile.entity';

export default class FeProfileSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('DELETE FROM feprofiles');
    await dataSource.query('ALTER TABLE feprofiles AUTO_INCREMENT=1');
    const feprofileRepo = dataSource.getRepository(FEProfile); /*
    await feprofileRepo.insert({
      fws: ['React'],
      tools: ['babel'],
    });//*/
    await feprofileRepo.insert({
      fws: ['React'],
      tools: ['babel'],
      jsLvl: 2,
      tsLvl: 4,
      htmlLvl: 3,
      cssLvl: 3,
    });
  }
}
