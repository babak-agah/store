import { UserRoles } from 'src/users/user.entity';

export interface IToken {
  userId: string;
  roles: UserRoles[];
  ipAddress: string;
}
