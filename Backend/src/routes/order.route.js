import express from 'express';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.post('/new', orderController.newOrder);

router.get('/list', orderController.allOrder);

router.delete('/:idBuyer/:idItem', orderController.removeOrder);

export default router;
