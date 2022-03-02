import { Injectable } from '@nestjs/common';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  async createReview(data, user) {
    console.log(data, user);
    const newComment = Review.create(data);
    const review = new Review();
    review.comment = data.comment;
    review.rating = data.rating;
    review.restraunt = data.restrauntId;
    review.user = user;
    await review.save();
    return review;
  }
}
