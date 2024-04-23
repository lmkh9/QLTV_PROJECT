import express from 'express';
import  userContronller from '../controllers/user.controller.js';

const router = express.Router();



router.get('/:id/cart', userContronller.cartUser);
router.get('/:id/order', userContronller.orderListUser);
router.get('/:id', userContronller.showUser);
router.get('/', userContronller.allUser);

router.delete('/delete/:id', userContronller.removeUser);

export default router;