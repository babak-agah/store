import { Schema } from 'mongoose';
import { CitySchema } from 'src/cities/city.entity';

export const StatesSchema = new Schema({
  name: { type: String, required: true, unique: true, index: 1 },
  cities: [CitySchema],
});

StatesSchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface StateInstace {
  _id: string;
  name: string;
  cities: [{ CityInstace }];
}

export type State = StateInstace & Document;
