import express from 'express';
const router = express.Router();
import {authenticationMiddleware,authorizationMiddleware,loginLimiter} from '../middlewares/authenticationMiddleware.js'
import {getById,create,update,remove,login,search} from '../controllers/UserController.js'

router.get('/v1/user/search',search)
router.get('/v1/user/:id',getById);
router.post('/v1/user', create);
router.post('/v1/user/token',loginLimiter,login)
router.put('/v1/user/:id',authenticationMiddleware,authorizationMiddleware, update);
router.delete('/v1/user/:id', authenticationMiddleware,authorizationMiddleware,remove);
export default router;