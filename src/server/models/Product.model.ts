import { Document, Schema, model } from 'mongoose';
import { IProduct } from '../interfaces/Product.interface';

export class Product {
  code: string;
  price: number;
  title: string;
  
  constructor(data: {
    code: string,
    price: number,
    title: string,
  }) {
    this.code = data.code;
    this.price = data.price;
    this.title = data.title;
  }
}

const ProductSchema = new Schema({
  code: String,
  price: Number,
  title: String,
  dateCreated: {
    type: Date,
    default: Date.now(),
  }
})

export interface ProductDocument extends Product, Document {};

export const Products = model<ProductDocument>('Product', ProductSchema);
