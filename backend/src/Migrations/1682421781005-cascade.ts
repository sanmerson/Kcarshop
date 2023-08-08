import { MigrationInterface, QueryRunner } from "typeorm";

export class cascade1682421781005 implements MigrationInterface {
    name = 'cascade1682421781005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "annoucements" DROP CONSTRAINT "FK_c609064c91ed6d46ab2c9b8b5e7"`);
        await queryRunner.query(`ALTER TABLE "annoucements" ADD CONSTRAINT "FK_c609064c91ed6d46ab2c9b8b5e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "annoucements" DROP CONSTRAINT "FK_c609064c91ed6d46ab2c9b8b5e7"`);
        await queryRunner.query(`ALTER TABLE "annoucements" ADD CONSTRAINT "FK_c609064c91ed6d46ab2c9b8b5e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
