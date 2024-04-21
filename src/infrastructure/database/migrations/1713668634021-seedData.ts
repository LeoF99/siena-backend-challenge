/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedData1713668634021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE intents (
        id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
        intent varchar(255) NOT NULL,
        response varchar(255) NOT NULL,
        channel varchar(255) NOT NULL
      )
    `);

    await queryRunner.query(`
      INSERT INTO intents (intent, response, channel) VALUES
      (
        'General inquiry',
        'We are here to assist you with any questions or assistance you may need.',
        'instagram'
      );
    `);

    await queryRunner.query(`
      INSERT INTO intents (intent, response, channel) VALUES
      (
        'Request for international shipping information',
        'we offer international shipping in 50 countries.',
        'facebook'
      );
    `);

    await queryRunner.query(`
      INSERT INTO intents (intent, response, channel) VALUES
      (
        'Request for product details',
        'you can check our product specifications on our website.',
        'email'
      );
    `);

    await queryRunner.query(`
      INSERT INTO intents (intent, response, channel) VALUES
      (
        'Inquiry about product specifications',
        'here are our specifications',
        'email'
      );
    `);

    await queryRunner.query(`
      INSERT INTO intents (intent, response, channel) VALUES
      (
        'Request for veteran discount',
        'we offer 10% discount to veterans',
        'whatsapp'
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM intents;');
  }
}
