import { Schema } from 'mongoose';

const Configuration = {
  name: String,
  value: Schema.Types.Mixed,
};

export const ProductItemSchema = {
  name: { type: String },
  sku: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    index: 1,
  },
  qtyInStock: { type: Number, required: true },
  images: [String],
  price: { type: Number, required: true },
  configurations: [Configuration],
};

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: [true, 'categoryId is required.'],
    },
    description: { type: String },
    images: String,
    userId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    configurations: [Configuration],
    productItems: [ProductItemSchema],
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
