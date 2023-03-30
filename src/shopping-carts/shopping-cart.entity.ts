import { Schema } from 'mongoose';

const product = {
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  sku: { type: String, required: true },
  qty: { type: Number, required: true },
};

export const ShoppingCartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [product],
});
