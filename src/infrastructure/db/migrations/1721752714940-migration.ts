import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1721752714940 implements MigrationInterface {
    name = 'Migration1721752714940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "balance" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "balance" DROP DEFAULT`);
    }

}
