const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database'); 

const Game = db.define('Game', {
    title: {
        type: DataTypes.STRING(200),  
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Game title cannot be empty',
            },
            len: {
                args: [2, 200],
                msg: 'Game title must be between 2 and 50 characters long',
            }
        }
    },
    rating: {
        type: DataTypes.DOUBLE,  
        allowNull: true,


    },
    release: {
        type: DataTypes.DATE//,
        //allowNull: false

        //validate: {
        //    notNull: {
        //        msg: 'Release date cannot be empty',
        //    }
        //}
    },
    
    summary: {
        type: DataTypes.TEXT,  
        allowNull: false,
        summary: {
            notNull: {
                msg: 'Game summary cannot be empty', 
            }
        }
    },
    timesListed: {
        type: DataTypes.INTEGER,  
    },
    reviewNumber: {
        type: DataTypes.INTEGER,  
    },
    timesPlayed: {
        type: DataTypes.INTEGER,  
    },
    backlogs: {
        type: DataTypes.INTEGER,  
    },
    wishlist: {
        type: DataTypes.INTEGER,  
    },
    playing: {
        type: DataTypes.INTEGER,  
    },

}, {
    timestamps: false  
});

module.exports = Game;
