import { Injectable } from '@nestjs/common';
import { Restros } from 'src/restros/restro.entity';
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

    const restro = await Restros.findOne(data.restrauntId);
    console.log(restro);
    const allRating = await Review.find({
      where: {
        restraunt: restro.id,
      },
    });
    const ratingsSum = allRating.reduce((acc, curr) => acc + curr.rating, 0);
    console.log(ratingsSum);

    const avgRating = ratingsSum / allRating.length;
    console.log(avgRating);

    restro.rating = Math.floor(avgRating);
    await restro.save();
    return { review, avgRating: restro.rating };
  }
}
