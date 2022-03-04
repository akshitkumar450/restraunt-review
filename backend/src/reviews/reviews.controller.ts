import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CurrentUserInterceptor } from 'src/user/interceptor/current-user.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { User } from 'src/user/user.entity';
import { identity } from 'rxjs';
import { updateReview } from './schemas/review.schema';
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseInterceptors(CurrentUserInterceptor)
  createReview(@Body() body, @CurrentUser() user: User) {
    // console.log(user);
    return this.reviewsService.createReview(body, user);
  }

  @Delete('/:id')
  deleteReview(@Param() id) {
    console.log(id);
    return this.reviewsService.deleteReview(id);
  }

  @Put('/:id')
  updateReview(@Param() id, @Body() body) {
    const { value, error } = updateReview.validate(body);
    if (error) throw error;
    return this.reviewsService.updateReview(id, value);
  }
}
