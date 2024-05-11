import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { BEProfile } from '../../src/modules/profile/subprofiles/beprofile.entity';

export default class BeProfileSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('DELETE FROM beprofiles');
    await dataSource.query('ALTER TABLE beprofiles AUTO_INCREMENT=1');
    const beprofileRepo = dataSource.getRepository(BEProfile);
    await beprofileRepo.insert({
      fws: ['Django'],
      plangs: ['Python'],
      dockerLvl: 2,
      kuberLvl: 1,
      awsAzureGcpLvl: 1,
      sqlLvl: 3,
    });
  }
}
