import { Document } from 'mongoose';

import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['ADMIN', 'USER'] },
});

export interface UserInstace {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

export type User = UserInstace & Document;

export type FindUserPublic = Pick<UserInstace, '_id' | 'name' | 'email'>;
