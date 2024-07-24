import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721760718725 implements MigrationInterface {
    name = 'Migration1721760718725';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "balance_snapshots" DROP CONSTRAINT "UQ_d31e10718b82a5b05f00e0971b6"`,
        );
        await queryRunner.query(
            `ALTER TABLE "balance_snapshots" ADD CONSTRAINT "user_date_balance_unique" UNIQUE ("user_id", "date")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "balance_snapshots" DROP CONSTRAINT "user_date_balance_unique"`,
        );
        await queryRunner.query(
            `ALTER TABLE "balance_snapshots" ADD CONSTRAINT "UQ_d31e10718b82a5b05f00e0971b6" UNIQUE ("date")`,
        );
    }
}
