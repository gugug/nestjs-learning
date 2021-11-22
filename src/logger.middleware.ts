import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request url:',req.url);
    const start = new Date().getTime();
    next();
    console.log('Response cost time(ms):', new Date().getTime() - start);

  }
}
