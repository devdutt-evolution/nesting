import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBadRequestResponse({ description: 'Required body missing' })
  @ApiCreatedResponse({ description: 'user registered' })
  signup(@Body() userDto: UserDto) {
    return this.authService.signup(userDto);
  }

  @ApiBadRequestResponse({ description: 'Required body is missing' })
  @ApiForbiddenResponse({ description: 'Credentials does not match' })
  @ApiOkResponse({ description: 'Logged in successfully' })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() userDto: UserDto) {
    return this.authService.signin(userDto);
  }
}
