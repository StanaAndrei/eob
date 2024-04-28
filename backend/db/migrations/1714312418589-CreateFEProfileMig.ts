import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFEProfileMig1714312418589 implements MigrationInterface {
  name = 'CreateFEProfileMig1714312418589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feprofiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'fws',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'js_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ts_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'html_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'css_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'tools',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'profiles',
      new TableForeignKey({
        columnNames: ['fe_profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'feprofiles',
        onDelete: 'CASCADE',
        name: 'FK_feprofile_profile',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE profiles DROP CONSTRAINT FK_feprofile_profile',
    );
    await queryRunner.dropTable('feprofiles');
  }
}
