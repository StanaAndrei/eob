import { runSeeders } from 'typeorm-extension';
import dataSource from './typeorm.config';

(async () => {
  console.log('init...');
  await dataSource.initialize();
  console.log('seeding...');
  await runSeeders(dataSource);
})();
