import { Types } from 'mongoose';
import { User } from './entities/users.entity';
import { CreateUserDTO } from './dto/create-user.dto';

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
  getOne(id: Types.ObjectId): Promise<User>;
  createOne(createUserDto: CreateUserDTO): Promise<Pick<User, 'id' | 'email'>>;
}
