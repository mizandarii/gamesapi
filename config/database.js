const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('gamesAPI', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize