import { variationModels } from './../variations/variations.entity';
import { Schema } from 'mongoose';

const Configuration = {
  variationId: { type: Schema.Types.ObjectId, ref: 'Variation' },
  name: { type: String, required: true },
  model: {
    type: String,
    enum: variationModels,
  },
  unit: String,
  values: [Schema.Types.Mixed],
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

export interface Configuration {
  name: String;
  values: [Schema.Types.Mixed];
}

export interface ProductItem {
  name: string;
  sku: string;
  qtyInStock: number;
  images: string[];
  price: number;
  configurations: Configuration[];
}
export interface ProductInstace {
  _id: string;
  name: string;
  description: string;
  price: number;
  configurations: [];
  productItems: ProductItem[];
}

export type Product = ProductInstace & Document;
