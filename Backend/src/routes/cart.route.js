import express from 'express';
import cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.put('/add', cartController.addCart);
router.delete('/:idUser/:idItem', cartController.deleteItemInCart);

export default router;
