const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize-define('User', {
        user_id: DataTypes.NUMBER,
        first_name: DataTypes.STRING
    });
    return User;
};
