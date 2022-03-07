import { Injectable, NotFoundException } from '@nestjs/common';
import { Restros } from './restro.entity';

@Injectable()
export class RestrosService {
  async findAllRestros(query) {
    // console.log(query);
    const allRestros = await Restros.count();
    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 5;
    const skipVal = (page - 1) * limit;

    const restros = await Restros.find({
      skip: skipVal,
      take: limit,
    });

    // query = query.skip(skipVal).take(limit);

    // if (query.page) {
    //   if (skipVal >= allRestros) {
    //     throw new Error('this page does not exist');
    //   }
    // }
    return { restros, allRestros };
  }

  createRestro(data) {
    const newRestro = Restros.create(data);
    return Restros.save(newRestro);
  }

  async deleteRestrant(id) {
    const restrauntToBeDeleted = await Restros.findOne(id);
    if (restrauntToBeDeleted) {
      await Restros.delete(restrauntToBeDeleted);
      return {};
    } else {
      throw new NotFoundException();
    }
  }

  async updateRestraunt(id, data) {
    const restrauntToBeUpdated = await Restros.findOne(id);
    if (restrauntToBeUpdated) {
      Object.assign(restrauntToBeUpdated, data);
      return Restros.save(restrauntToBeUpdated);
    } else {
      throw new NotFoundException();
    }
  }

  async getRestraunt(id) {
    const restro = await Restros.findOne(id, {
      relations: ['review', 'review.user'],
    });
    // console.log(restro.review.length);
    // restro.review.sort()

    const currentRating = restro.review[restro.review.length - 1];

    restro.review.sort((a, b) => a.rating - b.rating);
    // console.log(restro.review[0]);
    const lowestRating = restro.review[0];
    const highestRating = restro.review[restro.review.length - 1];

    // console.log(lowestRating);
    // console.log(highestRating);

    if (!restro) throw new NotFoundException();
    return { restro, lowestRating, highestRating, currentRating };
  }
}
