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
  icon: { type: String },
});

ProductCategorySchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface ProductCategoryInstace {
  _id: string;
  name: string;
  parent?: string;
  ancestors: string[];
  icon: string;
}

export type ProductCategory = ProductCategoryInstace & Document;
