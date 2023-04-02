import { Schema } from 'mongoose';

export const UnitSchema = new Schema({
  name: { type: String, required: true, index: true },
});

export interface UnitInsatce {
  _id: string;
  name: string;
}

export type Unit = UnitInsatce & Document;
