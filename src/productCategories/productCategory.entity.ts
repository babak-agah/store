import { Schema } from 'mongoose';

export const ProductCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  children: [{ type: Schema.Types.ObjectId, ref: 'ProductCategory' }],
});
