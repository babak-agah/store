import { Schema } from 'mongoose';
import { UnitSchema } from 'src/units/unit.entity';

export type VariationModelType = 'color' | 'number' | 'text' | 'select';

export const variationModels: VariationModelType[] = [
  'color',
  'number',
  'text',
  'select',
];

export const VariationSchema = new Schema({
  name: { type: String, required: true },
  model: {
    type: String,
    enum: variationModels,
  },
  options: [Schema.Types.Mixed],
  units: [UnitSchema],
  productCategoryId: { type: Schema.Types.ObjectId, ref: 'productCategory' },
});

export interface VariationInstace {
  _id: string;
  name: string;
  model: VariationModelType;
  options: any[];
  units: any[];
  productCategoryId: string;
}

export type Variation = VariationInstace & Document;
