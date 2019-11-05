
exports.up = function(knex) {
    return knex.schema.createTable('specs', function(table) {
        table.increments();

        table.float('VIM').notNullable();
        table.string('make').notNullable();
        table.string('model').notNullable();
        table.float('mileage').notNullable();
        table.string('type');
        table.string('status');

        table.timestamps(true, true)
    });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('specs')
};
