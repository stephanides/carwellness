import * as express from 'express';
import { ProductController } from '../controllers/Product.controller';
import { checkToken } from './helpers/CheckToken.helper';

const router = express.Router();
const product = new ProductController();

router.get('/products', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    product.getProducts(req, res, next);
  });
});

router.post('/product/create', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    product.create(req, res, next);
  });
});

router.delete('/product/remove/:id', (req, res, next) => {
  checkToken(req, res, next, (next) => {
    product.removeProduct(req, res, next);
  });
});

export default router;