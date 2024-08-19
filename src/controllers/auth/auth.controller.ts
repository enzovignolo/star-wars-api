import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDTO, SignUpResponse } from './dto/signup.dto';
import { SignInDTO, SignInResponse } from './dto/signin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}

  @ApiOkResponse({ type: SignUpResponse })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  async signUp(@Body() data: SignUpDTO): Promise<SignUpResponse> {
    return await this.authService.signUp(data);
  }

  @ApiOkResponse({ type: SignInResponse })
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() data: SignInDTO): Promise<SignInResponse> {
    const token = await this.authService.signIn(data);
    return { token };
  }
}
