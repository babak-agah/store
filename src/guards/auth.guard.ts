import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SessionType } from 'src/utils/interfaces/session.interface';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { session } = request as { session: SessionType };
    if (session.userId) return Boolean(session.userId);
  }
}
