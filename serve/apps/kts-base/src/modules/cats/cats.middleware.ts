// import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    next();
    // const authHeaders = req.headers.authorization;
    // if (authHeaders && (authHeaders as string).split(' ')[1]) {
    //   next();
    // } else {
    //   throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    // }
  }
}