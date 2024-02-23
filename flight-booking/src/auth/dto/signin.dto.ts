import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AccessToken {
  @ApiResponseProperty()
  access_token: string;
}
