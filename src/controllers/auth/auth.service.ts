import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { USERS_REPOSITORY, UsersRepository } from '../users/users.interface';
import { SignUpDTO } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDTO } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
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
  async signIn(signInData: SignInDTO): Promise<string> {
    const user = await this.usersRepository.getOneByEmail(signInData.email);
    if (!user || !(await bcrypt.compare(signInData.password, user.hash)))
      throw new UnauthorizedException('Email or password incorrect');
    return await this.jwtService.signAsync({
      email: user.email,
      role: user.role,
    });
  }
}
