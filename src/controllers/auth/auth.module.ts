import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../users/entities/users.entity';
import { UserMongoRepository } from '../users/repositories/user-mongo.repository';
import { UserSchema } from '../users/schemas/users.schema';
import { USERS_REPOSITORY } from '../users/users.interface';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: USERS_REPOSITORY, useClass: UserMongoRepository },
  ],
})
export class AuthModule {}
