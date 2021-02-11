const User = require('../../model/User');

const userData = [
    {
        username: "melanie",
        password: "melanie"
    },
    {
        username: "jarrett",
        password: "jarrett"
    },
    {
        username: "david",
        password: "david"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;