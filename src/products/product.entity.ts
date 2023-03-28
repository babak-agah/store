import { Schema } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: { type: String, required: true },
    creator: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

// Ensure virtual fields are serialised.
// ProductSchema.set('toJSON', {
//   virtuals: true,
// });

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
