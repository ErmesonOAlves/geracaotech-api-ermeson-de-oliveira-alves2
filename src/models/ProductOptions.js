import Product from './Product.js'
import {DataTypes,Model} from 'sequelize'
import sequelize from '../config/connection.js'

class ProductOptions extends Model{}
ProductOptions.init({
    id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Product,
            key:'id'
        }
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    shape:{
        type: DataTypes.ENUM('square','circle'),
        allowNull: true,
        defaultValue:'square'
    },
    radius:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type:{
        type: DataTypes.ENUM('text','color'),
        allowNull:true,
        defaultValue:'text'
    },
    values:{
        type:DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName:'ProductOptions',
    tableName:'product_options',
    timestamps:true,
    underscored:true
})

export default ProductOptions
