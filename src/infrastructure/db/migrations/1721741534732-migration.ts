import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721741534732 implements MigrationInterface {
    name = 'Migration1721741534732';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "balance_snapshots" ("id" SERIAL NOT NULL, "balance" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_8210c122fc87585d84277962770" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "staking_rounds" ("id" SERIAL NOT NULL, "date" date NOT NULL, "rate_percentage" double precision, CONSTRAINT "UQ_f515a78595eb26679498ddb5d41" UNIQUE ("date"), CONSTRAINT "PK_abf3ae1ffc98d1345d3bc841bb4" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "staking_round_has_balance" ("user_id" integer NOT NULL, "staking_round_id" integer NOT NULL, "averageBalance" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_576a07f07aef36b0d9d3633d920" PRIMARY KEY ("user_id", "staking_round_id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "balance" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL, "type" character varying NOT NULL, "status" character varying NOT NULL, "tax_percentage" double precision, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "owner_id" integer, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "balance_snapshots" ADD CONSTRAINT "FK_cea96ae2f0c38ee1332eb406327" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" ADD CONSTRAINT "FK_9d38f550bd0428550e94cacd3e7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" ADD CONSTRAINT "FK_8d2148a003164bbd620011e08d2" FOREIGN KEY ("staking_round_id") REFERENCES "staking_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "transactions" ADD CONSTRAINT "FK_6a37d470277421e5b1241263a12" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "transactions" DROP CONSTRAINT "FK_6a37d470277421e5b1241263a12"`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" DROP CONSTRAINT "FK_8d2148a003164bbd620011e08d2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "staking_round_has_balance" DROP CONSTRAINT "FK_9d38f550bd0428550e94cacd3e7"`,
        );
        await queryRunner.query(
            `ALTER TABLE "balance_snapshots" DROP CONSTRAINT "FK_cea96ae2f0c38ee1332eb406327"`,
        );
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "staking_round_has_balance"`);
        await queryRunner.query(`DROP TABLE "staking_rounds"`);
        await queryRunner.query(`DROP TABLE "balance_snapshots"`);
    }
}
