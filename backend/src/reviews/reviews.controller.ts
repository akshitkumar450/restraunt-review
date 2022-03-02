import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CurrentUserInterceptor } from 'src/user/interceptor/current-user.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseInterceptors(CurrentUserInterceptor)
  createReview(@Body() body, @CurrentUser() user: User) {
    // console.log(user);
    return this.reviewsService.createReview(body, user);
  }
}
