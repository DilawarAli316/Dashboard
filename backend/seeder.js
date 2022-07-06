import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/user.js'
import User from './models/User.js'
import connectDB from './config/db.js'
import Category from './models/Category.js'
import category from './data/category.js'
import Product from './models/Product.js'
import products from './data/product.js'
import Type from './models/Type.js'
import type from './data/type.js'
import Brand from './models/Brand.js'
import brand from './data/brand.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await Type.deleteMany()
    // await Brand.deleteMany()

    const createUsers = await User.insertMany(users) // inserting all the users in User Model
    const createCategory = await Category.insertMany(category)
    // const createBrand = await Brand.insertMany(brand)
    const createType = await Type.insertMany(type)

    const adminUser = createUsers[0]._id

    const sampleProducts = products.map((product, index) => {
      const categoryWise = createCategory[index]._id
      const typeWise = createType[index]._id
      // const brandWise = createBrand[index]._id

      // for every product the user would be admin
      return {
        ...product,
        user: adminUser,
        categoryId: categoryWise,
        typeId: typeWise,
        // brandId: brandWise,
      }
    })

    // const menType = createCategory[0]._id
    // const womenType = createCategory[1]._id

    // const sampleType = type.map((typ, index) => {
    //   let productType = menType

    //   console.log(index)

    //   if (index >= 3) {
    //     productType = womenType
    //   }

    //   return { ...typ, categoryId: productType }
    // })

    await Product.insertMany(sampleProducts) // inserting that product in Product Model
    // await Type.insertMany(type)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1) // exit with failure
  }
}

const destroyData = async () => {
  try {
    // await Order.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await Type.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.log(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
