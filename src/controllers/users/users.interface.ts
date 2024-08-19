import { User } from './entities/users.entity';
import { CreateUserDTO } from './dto/create-user.dto';

export const USERS_REPOSITORY = 'UsersRepository';

export interface UsersRepository {
  getOneByEmail(email: string): Promise<User>;
  createOne(createUserDto: CreateUserDTO): Promise<Pick<User, 'id' | 'email'>>;
}
