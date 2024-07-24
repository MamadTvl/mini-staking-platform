import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721769298638 implements MigrationInterface {
    name = 'Migration1721769298638';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" DROP COLUMN "averageBalance"`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" ADD "average_balance" double precision NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" ADD "snapshot_count" integer NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" DROP COLUMN "snapshot_count"`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" DROP COLUMN "average_balance"`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" ADD "averageBalance" double precision NOT NULL`,
        );
    }
}
