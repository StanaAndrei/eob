import { createDatabase } from 'typeorm-extension';
import { dsoAndSo } from './typeorm.config';

(async () => {
  await createDatabase({
    options: dsoAndSo,
    ifNotExist: true,
  });
})();
