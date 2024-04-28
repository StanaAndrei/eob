import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBEProfileMig1714312715588 implements MigrationInterface {
  name = 'CreateBEProfileMig1714312715588';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'beprofiles',
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
            name: 'plangs',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'docker_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'kuber_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'aws_azure_gcp_lvl',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'sql_lvl',
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
        columnNames: ['be_profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'beprofiles',
        onDelete: 'CASCADE',
        name: 'FK_beprofile_profile',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE profiles DROP CONSTRAINT FK_beprofile_profile',
    );
    await queryRunner.dropTable('beprofiles');
  }
}
