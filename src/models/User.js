import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'
class User extends Model { }
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:true
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        underscored: true,
        defaultScope: {
        attributes: { exclude: ['password'] }
    }
    }
)

export default User