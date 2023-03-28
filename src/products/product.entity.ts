import { Schema } from 'mongoose';
import { VariantionOption } from 'src/product-categories/product-category.entity';

export const ProductItemSchema = new Schema({
  name: { type: String },
  prodcutId: { type: Schema.Types.ObjectId, ref: 'Product' },
  SKU: { type: String, required: true },
  qtyInStock: { type: Number, required: true },
  images: [String],
  price: { type: Number, required: true },
  configurations: [VariantionOption],
});

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    description: { type: String, required: true },
    images: String,
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productItems: { type: [ProductItemSchema], required: true },
  },
  { timestamps: true },
);

ProductSchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface ProductInstace {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export type Product = ProductInstace & Document;
