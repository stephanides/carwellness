import * as mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IProduct } from '../interfaces/Product.interface';

import { Product, ProductDocument, Products } from '../models/Product.model';

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productExist = await Products.findOne({ code: req.body.code });

      if (productExist) {
        throw this.throwError('Product allready exist', 409, next);
      } else {
        let productData: object = {} as IProduct;
        let i = 0;
        
        while(i < Object.keys(req.body).length) {
          productData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i];
          i += 1;
        }
        /* for(let i: number = 0; i < Object.keys(req.body).length; i++) {
          employeeData[Object.keys(req.body)[i]] = (<any>Object).values(req.body)[i];
        } */

        const newProduct = new Product(productData as IProduct);
        
        await Products.create(newProduct);

        res.json({ data: 'Product has been created', success: true });
      }
    } catch (err) {
      return next(err);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products: Array<Object> = await Products.find({}).sort({ dateCreated: -1 }).find({});

      if(!products || products.length < 1) {
        this.throwError('Nothing found', 404, next);
      } else {
        res.json({ data: products, success: true });
      }
    } catch (err) {
      return next(err);
    }
  }

  async removeProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productToRemove = Products.findOne({ _id: mongoose.Types.ObjectId(req.params.id) });

      if (!productToRemove) {
        this.throwError('Employee not found', 404, next);
      } else {
        await Products.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });

        res.json({ data: "Employee has been removed" });
      }
    } catch (err) {
      return next(err);
    }
  }

  throwError(errMessage: string, errStatus: number, next: NextFunction): void {
    const err: Error = new Error(errMessage);

    err['status'] = errStatus
    return next(err)
  }
}
