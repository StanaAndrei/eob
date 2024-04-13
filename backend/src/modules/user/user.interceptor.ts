import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClassFromExist } from 'class-transformer';
import { UserDTO } from './dtos/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) =>
        data.map((item: User) => {
          const res = { ...item };
          delete res.password;
          return res;
        }),
      ),
    );
  }

  private transformUser(user: User): UserDTO {
    return plainToClassFromExist(new UserDTO(), user, {
      excludeExtraneousValues: true,
    });
  }
}
