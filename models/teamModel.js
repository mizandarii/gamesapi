const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database'); 

const Team = db.define('Team', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Team name cannot be empty',
            },
        }
    },
}, {
    timestamps: false  
});

module.exports = Team;
