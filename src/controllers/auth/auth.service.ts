import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../users/users.interface';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}
  async signUp(signUpData: SignUpDTO) {
    if (signUpData.password != signUpData.passwordConfirmation)
      throw new BadRequestException(
        'password and passwordConfirmation do not match',
      );
    const hash = await bcrypt.hash(signUpData.password, 12);
    const userCreated = await this.usersRepository.createOne({
      email: signUpData.email,
      hash,
    });
    return userCreated;
  }
}
