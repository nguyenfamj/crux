import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../db/schema.type';

export const RequestUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
