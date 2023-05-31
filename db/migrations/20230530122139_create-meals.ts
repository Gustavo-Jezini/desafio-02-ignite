import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.text('description').notNullable()
    table.boolean('isOnDiet').notNullable()
    table.timestamp('date').defaultTo(knex.fn.now()).notNullable()

    table.uuid('user_id').references('users.id').onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals')
}
