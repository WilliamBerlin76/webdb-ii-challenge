
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('specs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('specs').insert([
        {id: 1, VIM: 835967, make: 'testing seeds', model: 'test model', mileage: 1254, type: 'new', status: 'nice'},
        {id: 2, VIM: 14586, make: 'testing truncate', model: 'another one', mileage: 1}
      ]);
    });
};
