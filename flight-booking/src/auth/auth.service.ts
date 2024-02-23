import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { hash, verify } from 'argon2';

import { AccessToken, SigninDto, SignupDto } from './dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async singup(singupData: SignupDto): Promise<{ _id: string; email: string }> {
    singupData['hash'] = await hash(singupData.password); // hashing password
    delete singupData.password;
    const user = await this.UserModel.create(singupData); // creating user

    return { _id: user.get('_id'), email: user.get('email') };
  }

  async singin(singinData: SigninDto): Promise<AccessToken> {
    const user = await this.UserModel.findOne({
      email: singinData.email,
    }).lean(); // getting user

    // verifing password
    if (user && (await verify(user.hash, singinData.password))) {
      delete user.hash;

      const access_token = await this.signToken(
        user._id.toString(),
        user.email,
      );

      return { access_token };
    }

    throw new NotFoundException('credentials does not match');
  }

  // create access token
  signToken(userId: string, email: string): Promise<string> {
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
