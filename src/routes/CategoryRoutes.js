import {getById,create,search,update,remove} from '../controllers/CategoryController.js'
import express from 'express'
 const router = express.Router();
 import {authenticationMiddleware} from '../middlewares/authenticationMiddleware.js'


router.get('/v1/category/search',search)
router.get('/v1/category/:id',getById)
router.post('/v1/category',authenticationMiddleware, create)
router.put('/v1/category/:id',authenticationMiddleware,update)
router.delete('/v1/category/:id',authenticationMiddleware,remove)


export default router

