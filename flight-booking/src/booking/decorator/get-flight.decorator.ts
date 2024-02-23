import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const GetFlight = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const flightId = req.body.flightId;

    if (!flightId) throw new NotFoundException();

    // let flight = await
  },
);

// TODO create and apply this decorator to check if the flight exist before hand
