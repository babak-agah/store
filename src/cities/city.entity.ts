import { Schema } from 'mongoose';

export const CitySchema = new Schema({
  name: { type: String, required: true, unique: true, index: 1 },
  coordinate: { type: [Number], required: true, length: 2 },
});

export interface CityInstace {
  name: string;
  coordinate: [number, number];
}
