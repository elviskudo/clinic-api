import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/service/auth/auth.service';
import { Request, Response, NextFunction } from 'express';
import { format_json } from 'src/env';

@Injectable()
export class TokenBlacklistMiddleware implements NestMiddleware {
  constructor(private readonly blacklistService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    if(authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      if (token && this.blacklistService.isInBlacklist(token)) {
        return res.status(400).json(format_json(200, true, null, null, 'Invalid Token', null));
      }
    }
    next();
  }
}