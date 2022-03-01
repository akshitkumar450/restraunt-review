import { Module } from '@nestjs/common';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, CurrentUserInterceptor],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
