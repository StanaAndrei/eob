import { runSeeders } from 'typeorm-extension';
import dataSource from './typeorm.config';

(async () => {
  console.log('init...');
  await dataSource.initialize();
  console.log('seeding...');
  //await dataSource.synchronize(true);
  await runSeeders(dataSource);
  console.log('DONE!');
  process.exit();
})();
