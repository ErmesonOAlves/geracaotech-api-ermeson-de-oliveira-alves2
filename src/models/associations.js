import Product from './Product.js'
import Category from './Category.js'
import ProductCategories from './ProductCategories.js'
import ProductImages from './ProductImages.js'
import ProductOptions from './ProductOptions.js'
import User from './User.js'

Product.hasMany(ProductImages,{
    foreignKey:'product_id',
    as:'images'
})
ProductImages.belongsTo(Product,{
    foreignKey:'product_id',
    as:'product'
})

Product.hasMany(ProductOptions,{
    foreignKey:'product_id',
    as:'options'
})

ProductOptions.belongsTo(Product,{
    foreignKey:'product_id',
    as:'product'
})

Product.belongsToMany(Category,{
    through: ProductCategories,
    foreignKey: 'product_id',
    otherKey: 'category_id',
    as: 'category'
})

Category.belongsToMany(Product,{
    through: ProductCategories,
    foreignKey: 'category_id',
    otherKey: 'product_id',
    as: 'products'
})

export{User, Category,Product,ProductImages,ProductOptions}