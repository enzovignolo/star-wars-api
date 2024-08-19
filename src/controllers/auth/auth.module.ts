import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../users/entities/users.entity';
import { UserMongoRepository } from '../users/repositories/user-mongo.repository';
import { UserSchema } from '../users/schemas/users.schema';
import { USERS_REPOSITORY } from '../users/users.interface';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS } from 'src/common/constants/auth-constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: AUTH_CONSTANTS.JWT_SECRET,
      signOptions: { expiresIn: AUTH_CONSTANTS.JWT_EXPIRATION_SECONDS },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: USERS_REPOSITORY, useClass: UserMongoRepository },
  ],
})
export class AuthModule {}
