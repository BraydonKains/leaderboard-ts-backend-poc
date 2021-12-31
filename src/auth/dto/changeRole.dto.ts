import { UserRole } from 'src/users/user.entity';

export class ChangeRoleDto {
  userId: number;
  newRole: UserRole;
}
