import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // get token:
  const authToken = request.headers.authorization;

  // check if token has information
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    // check if token is valid
    // aula 05 nlw06
    const { sub } = verify(
      token,
      '76aa8e99f592680e6d8c93dd1bb1d932'
    ) as IPayload;

    // fetch user information
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
