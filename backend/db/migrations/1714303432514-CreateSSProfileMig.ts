import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSSProfileMig1714303432514 implements MigrationInterface {
  name = 'CreateSSProfileMig1714303432514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ssprofiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'comm_style',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'conflict_handling_method',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'listening_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'verbal_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'written_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'collab_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'conflict_resolution_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'leadership_lvl',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'profiles',
      new TableForeignKey({
        columnNames: ['ss_profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ssprofiles',
        onDelete: 'CASCADE',
        name: 'FK_ssprofile_profile',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE profiles DROP CONSTRAINT FK_ssprofile_profile',
    );
    await queryRunner.dropTable('ssprofiles');
  }
}
