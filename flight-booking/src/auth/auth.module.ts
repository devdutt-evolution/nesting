import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStartegy } from './strategy';

@Module({
  // controllers, prociders and injectors can acess the imported modules
  imports: [
    // mongoose User collection import
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // jwt stretegy for signing and verfying token
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStartegy],
})
export class AuthModule {}
