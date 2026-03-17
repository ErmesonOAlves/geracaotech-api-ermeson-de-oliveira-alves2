import express from 'express'
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'
import {create,search,getById,update,remove} from '../controllers/ProductController.js'

const router = express.Router();
router.get('/v1/product/search',search)
router.get('/v1/product/:id',getById)
router.post('/v1/product',authenticationMiddleware,create)
router.put('/v1/product/:id',authenticationMiddleware,update)
router.delete('/v1/product/:id', authenticationMiddleware, remove)

export default router