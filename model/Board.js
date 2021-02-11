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
        upper_left: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        upper_mid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        upper_right: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        center_left: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        center_mid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        center_right: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lower_left: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lower_mid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        lower_right: {
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