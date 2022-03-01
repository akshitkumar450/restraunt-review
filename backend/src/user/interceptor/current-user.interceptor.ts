import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user.service';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  //  DI to use Userservice
  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    //    context is wrapper around incoming request
    // getting logged in user from session
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const token = request.headers.token;
    // console.log(token);
    const decoded = jwt.verify(token, 'my-super-secret-string');
    // console.log(decoded);

    // @ts-ignore
    if (!decoded.userId) throw new BadRequestException('please login');
    // @ts-ignore
    const userId: any = decoded.userId;
    // console.log(userId);
    if (userId) {
      const user = await this.userService.findById(userId);

      // set the current logged in user to request so that it can be used in CurrentUser Decorator
      request.currentUser = user;
    }
    // to run actual route handler
    return next.handle();
  }
}
