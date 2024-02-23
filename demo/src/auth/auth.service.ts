import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as argon from 'argon2';

import { UserDto } from './dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(userDto: UserDto) {
    const hash = await argon.hash(userDto.password);
    const user = await this.userModel.create({ email: userDto.email, hash });
    return user;
  }

  async signin(userDto: UserDto) {
    const user = await this.userModel.findOne({ email: userDto.email }).lean();
    if (user && (await argon.verify(user.hash, userDto.password))) {
      delete user.hash;
      return {
        access_token: await this.signToken(user._id.toString(), user.email),
      };
    }

    throw new NotFoundException('User Does not exist');
  }

  async signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '50m',
      secret: this.config.get('SECRET'),
    });
  }
}
