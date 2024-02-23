import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from 'src/schema/user.schema';

// we can create custom param decorator with this function
// by passing callback function which takes data and its context as parameter
export const GetUser = createParamDecorator(
  (fieldName: string | undefined, ctx: ExecutionContext): User | string => {
    const req = ctx.switchToHttp().getRequest();
    return fieldName ? req.user[fieldName] : req.user;
  },
);
