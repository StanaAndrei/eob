import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import ReqUtils from 'src/utils/req.util';
import { JwtService } from '@nestjs/jwt';

export const ROLES_KEY = 'roles';
export const RolesPriority = (minRole: ROLE_PRIORITY) =>
  SetMetadata(ROLES_KEY, minRole);

export enum ROLE_PRIORITY {
  NEWBIE = 1,
  BUDDY,
  MANAGER,
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const reqMinPriority = this.reflector.getAllAndOverride<bigint>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!reqMinPriority) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const token = ReqUtils.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'fallback_secret',
      });
      const rolePriority = payload.rolePriority;
      return rolePriority >= reqMinPriority;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
