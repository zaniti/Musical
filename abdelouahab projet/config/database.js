const Sequelize = require('sequelize');

const connection = new Sequelize('listOfSong', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;