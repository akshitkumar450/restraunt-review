import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { CurrentUserInterceptor } from 'src/user/interceptor/current-user.interceptor';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, CurrentUserInterceptor],
})
export class ReviewsModule {}
