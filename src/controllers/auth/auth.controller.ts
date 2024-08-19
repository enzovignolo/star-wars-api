import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { SignUpDTO, SignUpResponse } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) {}

  @ApiOkResponse()
  @Post('/sign-up')
  async signUp(@Body() data: SignUpDTO): Promise<SignUpResponse> {
    return await this.authService.signUp(data);
  }
}
