import { Schema } from 'mongoose';

export const ProductCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    index: true,
  },
  parent: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'ProductCategory' }],
});

ProductCategorySchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface Variation {
  _id: string;
  name: string;
  options: any[];
}

export interface ProductCategoryInstace {
  _id: string;
  name: string;
  parent?: string;
  ancestors: string[];
}

export type ProductCategory = ProductCategoryInstace & Document;
