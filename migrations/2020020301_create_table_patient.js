exports.up = (knex) => knex.schema.createTable('patient', (table) => {
  table
    .uuid('id')
    .primary()
    .defaultTo(knex.raw('uuid_generate_v4()'))
  table.string('medical_record_no')
  table.string('name')
  table.text('diagnosis')
  table.text('operation')
  table.text('operative_instruments')
  table.text('types_of_anesthesia')
  table.string('admission_days')
  table.jsonb('data')
  table.uuid('create_by')
  table.timestamps(true, true)
  table.dateTime('deleted_at')
})

exports.down = (knex) => knex.schema.dropTable('admin')
