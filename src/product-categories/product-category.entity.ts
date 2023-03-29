import { Schema } from 'mongoose';

export const VariationSchema = new Schema({
  name: { type: String, required: true },
  options: [Schema.Types.Mixed],
});

export const ProductCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    index: true,
  },
  ancestors: [{ type: Schema.Types.ObjectId, ref: 'ProductCategory' }],
  parent: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  variations: { type: [VariationSchema] },
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
  variants: Variation[];
}

export type ProductCategory = ProductCategoryInstace & Document;
