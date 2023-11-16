import {
    HttpStatus,
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtVerify } from 'jose';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    use(req: Request, _res: Response, next: () => void) {
        jwtVerify(
            req.headers['session_token'] as string,
            Buffer.from(process.env.JWT_SECRET),
        )
            .then(() => {
                next();
            })
            .catch(() => {
                throw new UnauthorizedException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Unauthorized',
                });
            });
    }
}
