const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Board extends Model {}

//This is creating our user model
Board.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        left: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        right: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'board'
    }
);

module.exports = Board;