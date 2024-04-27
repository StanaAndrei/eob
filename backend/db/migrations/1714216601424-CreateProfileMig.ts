import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProfileMig1714216601424 implements MigrationInterface {
  name = 'CreateProfileMig1714216601424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'xp',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ind_type',
            type: 'enum',
            enum: ['TECH', 'HEALTH', 'FINANCE', 'EDU', 'RETAIL', 'OTHER'],
            enumName: 'IndustryType',
            isNullable: false,
          },
          {
            name: 'is_be',
            type: 'bool',
            isNullable: false,
          },
          {
            name: 'is_fe',
            type: 'bool',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['profile_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'profiles',
        onDelete: 'CASCADE',
        name: 'FK_user_profile',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users DROP CONSTRAINT FK_user_profile',
    );
    await queryRunner.dropTable('profiles');
  }
}
