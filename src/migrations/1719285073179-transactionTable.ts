import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionTable1719285073179 implements MigrationInterface {
    name = 'TransactionTable1719285073179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "user" text NOT NULL, "type" text NOT NULL, "location" text NOT NULL, "distance" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
