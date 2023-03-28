import { Schema } from 'mongoose';

export const CitySchema = new Schema({
  name: { type: String, required: true, unique: true, index: 1 },
  coordinate: { type: [Number], required: true, length: 2 },
});

export const StatesSchema = new Schema({
  name: { type: String, required: true, unique: true, index: 1 },
  cities: [CitySchema],
});

StatesSchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface CityInstace {
  name: string;
  coordinate: [number, number];
}
export interface StateInstace {
  _id: string;
  name: string;
  cities: CityInstace[];
}

export type State = StateInstace & Document;
