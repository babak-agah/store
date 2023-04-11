import { USER_ROLES, UserRoles } from 'src/users/user.entity';
import { Document, Schema } from 'mongoose';

export const RefreshTokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  ipAddress: { type: String, required: true },
  roles: [USER_ROLES],
});

export interface RefreshTokenInstace {
  _id: string;
  userId: string;
  ipAddress: string;
  roles: UserRoles[];
}

export interface AccessToken {
  userId: string;
  roles: UserRoles[];
}

export type RefreshToken = RefreshTokenInstace & Document;
