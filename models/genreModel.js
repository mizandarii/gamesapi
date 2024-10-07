const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database'); 

const Genre = db.define('Genre', {
    title: {
        type: DataTypes.STRING(50),  
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Genre title cannot be empty',
            },
        }
    },
}, {
    timestamps: false  
});

module.exports = Genre;
