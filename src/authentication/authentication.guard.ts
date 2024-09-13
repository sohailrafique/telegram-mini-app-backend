import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { ResponseService } from '../components/shared/services/response.service';
import { UserEntity } from '../components/user/entities/user.entity';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly responseService: ResponseService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: any = context.switchToHttp().getRequest();
    let token = req.headers.authorization || req.headers.jwt;
    if (!token) {
      throw new UnauthorizedException();
    }
    token = token.replace('Bearer ', '');
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // TODO: Also encrypt user's ip address (coming from request) and compare it with the decrypted one before proceeding

      const user = await this.userRepo.findOne({
        where: {
          email: (decodedToken as JwtPayload).email,
        },
        relations: ['role'],
      });

      if (!user) {
        return this.responseService.sendNotFoundException('User not found');
      }

      req.user = { ...user };
      return true;
    } catch (error) {
      const message =
        error?.message === 'jwt expired'
          ? 'User session expired'
          : error?.message;

      throw new UnauthorizedException(
        {
          code: HttpStatus.UNAUTHORIZED,
          message,
        },
        message,
      );
    }
  }
}
