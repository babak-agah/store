import { Document } from 'mongoose';

import { Schema } from 'mongoose';

export const AddressSchema = new Schema({
  phoneNumber: [String],
  mobileNumber: [String],
  region: { type: String },
  postalCode: { type: String, required: true },
  address_line1: { type: String, required: true },
  address_line2: { type: String },
  CityId: { type: Schema.Types.ObjectId, ref: 'City', require: true },
});

export const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
    },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['ADMIN', 'USER'] },
    addresses: [AddressSchema],
  },
  { timestamps: true },
);

UserSchema.method('toJSON', function () {
  const { __v, createdAt, updatedAt, ...object } = this.toObject();
  return object;
});

export interface Address {
  phoneNumber: string[];
  mobileNumber: string[];
  postCode: string;
  description: string;
  city: string;
}
export interface UserInstace {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  mobile: string;
  email?: string;
  password: string;
  role: 'ADMIN' | 'USER';
  addresses: [Address];
}

export type User = UserInstace & Document;

export type FindUserPublic = Pick<
  UserInstace,
  '_id' | 'username' | 'firstName' | 'lastName'
>;
