import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { SSProfile } from '../../src/modules/profile/subprofiles/ssprofile.entity';

export default class SSProfileSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('DELETE FROM ssprofiles');
    await dataSource.query('ALTER TABLE ssprofiles AUTO_INCREMENT=1');
    const ssprofileRepo = dataSource.getRepository(SSProfile);
    await ssprofileRepo.insert({
      listeningLvl: 1,
      verbalLvl: 1,
      writtenLvl: 1,
      collabLvl: 1,
      conflictResolutionLvl: 1,
      leadershipLvl: 1,
      commStyle: 'Assertive',
      conflictHandlingMethod: 'Avoidance',
    });
  }
}
