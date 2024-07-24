import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721779977930 implements MigrationInterface {
    name = 'Migration1721779977930';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "staking_rounds" ADD "status" character varying NOT NULL DEFAULT 'open'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "staking_rounds" DROP COLUMN "status"`,
        );
    }
}
