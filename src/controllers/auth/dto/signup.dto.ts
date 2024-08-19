import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { ROLES } from 'src/common/constants/role.enum';

export class SignUpDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: true })
  passwordConfirmation: string;
}

export class SignUpResponse {
  @ApiProperty({ type: String })
  id: Types.ObjectId;
  @ApiProperty()
  email: string;
}
