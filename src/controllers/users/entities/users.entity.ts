import { Types } from 'mongoose';
import { ROLES } from 'src/common/constants/role.enum';

export class User {
  id: Types.ObjectId;
  email: string;
  hash: string;
  role: ROLES;
}
