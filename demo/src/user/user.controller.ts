import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/schemas/user.schema';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ description: 'user details fetched' })
  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @GetUser() user: { email: User['email']; _id: string },
    // @GetUser('email') email: string,
  ): Promise<{ email: string; _id: string }> {
    return user;
  }
}
