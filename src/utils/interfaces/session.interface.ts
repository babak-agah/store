import { Session } from '@fastify/secure-session';

export interface SessionType extends Session {
  userId: string;
  admin: boolean;
}
