
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, vin: '1GGFF21GGGG123123', make: 'Ferrari', model: '250gt', milage: '000023', title: 'new', transmission: '6 Speed Manual'},
        {id: 2, vin: '1GGFF21HMHH123123', make: 'Lamborghini', model: 'Super Veloce', milage: '000012', title: 'new', transmission: '7 speed Manual'},
        {id: 3, vin: '1GGFFWEFGHH123123', make: 'Porsche', model: '918', milage: '000063', title: 'new', transmission: '6 Speed Manual'},
       
      ]);
    });
};
