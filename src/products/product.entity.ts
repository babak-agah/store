import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Duplicate the ID field.
ProductSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProductSchema.set('toJSON', {
  virtuals: true,
});

ProductSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

ProductSchema.method('toClient', function () {
  var obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

export interface ProductInstace {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export type Product = ProductInstace & Document;
