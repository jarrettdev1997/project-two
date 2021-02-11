const seedUsers = require('./users-seeds');
const seedBoard = require('./board-seed');
const seedGame = require('./game-seeds')

const sequelize = require('../../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedBoard();
  console.log('\n----- BOARD SEEDED -----\n');

  await seedGame();
  console.log('\n----- GAME SEEDED -----\n');

  process.exit(0);
};

seedAll();