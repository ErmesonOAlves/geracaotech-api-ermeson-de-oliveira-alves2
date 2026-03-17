import {DataTypes,Model} from 'sequelize';
import Product from './Product.js'
import sequelize from '../config/connection.js'

class ProductImages extends Model{}
ProductImages.init({
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
    enabled:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    path:{
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName:'ProductImages',
    tableName:'product_images',
    timestamps:true,
    underscored:true
}
)
export default ProductImages