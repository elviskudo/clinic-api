import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { format_json } from 'src/env';
import { AuthenticationService } from 'src/service/auth/authentication.service';

@Injectable()
export class TokenBlacklistMiddleware implements NestMiddleware {
  constructor(private readonly blacklistService: AuthenticationService) {}

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