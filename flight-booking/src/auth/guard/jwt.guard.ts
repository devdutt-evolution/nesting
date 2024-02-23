import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwtString') {
  constructor() {
    super();
  }
}
