import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User, UserRole } from 'src/users/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }
    const user: User = request.user;
    return user.role == UserRole.ADMIN;
  }
}
