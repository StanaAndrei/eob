import { dropDatabase } from 'typeorm-extension';
import { dsoAndSo } from './typeorm.config';

(async () => {
  await dropDatabase({
    options: dsoAndSo,
    ifExist: true,
  });
})();
