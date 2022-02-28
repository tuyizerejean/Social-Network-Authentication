module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        googleId:'checksdfhsjf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jon Doe',
        email: 'jondoe@example.com',
        googleId:'fhjgery',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

// database/seeds/xxxx-User.js