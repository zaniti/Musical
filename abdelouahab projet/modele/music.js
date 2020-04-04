const Sequelize = require('sequelize');
const connection = require('../config/database');

const music = connection.define('music', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlMusic: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

module.exports = music