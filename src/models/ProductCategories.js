import sequelize from '../config/connection.js'
import {DataTypes,Model} from 'sequelize'
import Category from './Category.js'
import Product from './Product.js'
class ProductCategories extends Model{}

ProductCategories.init({
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Product,
            key:'id'
        }
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Category,
            key:'id'
        }
    }

},{
    sequelize,
    tableName:'product_categories',
    modelName:'ProductCategories',
    timestamps:false,
    underscored:true
})


export default ProductCategories