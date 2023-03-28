import { Schema } from 'mongoose';

export const VariantionOption = new Schema({
  value: Schema.Types.Mixed,
});

export const VariationSchema = new Schema({
  name: { type: String, required: true },
  options: { type: [VariantionOption], required: true },
});

export const ProductCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  children: [{ type: Schema.Types.ObjectId, ref: 'ProductCategory' }],
  variations: { type: [VariationSchema] },
});

ProductCategorySchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface VariantionOption {
  _id: string;
  value: any;
}

export interface Variation {
  _id: string;
  name: string;
  options: VariantionOption[];
}

export interface ProductCategoryInstace {
  _id: string;
  name: string;
  variants: Variation[];
}

export type ProductCategory = ProductCategoryInstace & Document;
