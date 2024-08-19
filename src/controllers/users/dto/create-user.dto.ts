import { ROLES } from 'src/common/constants/role.enum';

export class CreateUserDTO {
  email: string;
  hash: string;
  role?: ROLES = ROLES.USER;
}
