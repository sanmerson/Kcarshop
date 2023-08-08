import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1683651986483 implements MigrationInterface {
    name = 'createEntities1683651986483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "is_updated" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "is_updated"`);
    }

}
