import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schema/user.schema';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy, 'jwtString') {
  constructor(
    config: ConfigService,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SECRET'),
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<{ _id: string; email: string }> {
    const user = await this.UserModel.findById(payload.sub, { hash: 0 }).lean();

    if (!user) throw new ForbiddenException('Not logged in');

    return {
      _id: user._id.toString(),
      email: user.email,
    };
  }
}
