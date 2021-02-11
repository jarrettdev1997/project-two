const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model {
    // this is a function that will check to make sure the password at login is correct
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

//This is creating our user model
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            // these are hooks that will occur at certain times based on their descriptions... all of these have to do with hashing passwords
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            },
            async beforeBulkCreate(newUserData) {
                for (const user of newUserData) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
                return newUserData
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;