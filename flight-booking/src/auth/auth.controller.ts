import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * Every decorator start with @Api is swagger tags
 */

// /auth
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // /auth/signup @default 201 for POST
  @ApiBadRequestResponse({ description: 'bad request body' })
  @ApiCreatedResponse({ description: 'registration successfull' })
  @Post('signup')
  async singup(@Body() signupDto: SignupDto) {
    return await this.authService.singup(signupDto);
  }

  // /auth/signin
  @ApiBadRequestResponse({ description: 'provide required data' })
  @ApiOkResponse({ description: 'logged in' })
  @ApiForbiddenResponse({ description: 'credentails does not match' })
  @Post('signin')
  @HttpCode(HttpStatus.OK) // specified 200 response
  singin(@Body() signinDto: SigninDto) {
    return this.authService.singin(signinDto);
  }
}
