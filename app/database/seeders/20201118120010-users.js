const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'Carlos',
    lastName: 'Quinteiro Anguita',
    nickName: 'El Sensei',
    email: 'quinte@example.com',
    password: await bcrypt.hash('password', 10),
    startDate: '2014-11-18',
    belt: 'purple',
    stripes: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'https://lacupula.s3.eu-west-2.amazonaws.com/kingte.jpeg',
  },
  {
    firstName: 'Javier',
    lastName: 'Sintes Medina',
    nickName: '7 marchas',
    email: 'javisin98@gmail.com',
    password: await bcrypt.hash('javisin1098', 10),
    startDate: '2019-02-01',
    belt: 'white',
    stripes: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'https://lacupula.s3.eu-west-2.amazonaws.com/kingte.jpeg',
  },
  {
    firstName: 'Alejandro',
    lastName: 'González Cejas',
    nickName: 'Shitty',
    email: 'ale@example.com',
    password: await bcrypt.hash('password', 10),
    startDate: '2019-03-01',
    belt: 'white',
    stripes: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'https://lacupula.s3.eu-west-2.amazonaws.com/kingte.jpeg',
  }]),

  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
