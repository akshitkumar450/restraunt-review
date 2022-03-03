import { Injectable, NotFoundException } from '@nestjs/common';
import { Restros } from './restro.entity';

@Injectable()
export class RestrosService {
  findAllRestros() {
    return Restros.find();
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
    restro.review.sort((a, b) => a.rating - b.rating);
    // console.log(restro.review[0]);
    const lowestRating = restro.review[0];
    const highestRating = restro.review[restro.review.length - 1];

    // console.log(lowestRating);
    // console.log(highestRating);

    if (!restro) throw new NotFoundException();
    return { restro, lowestRating, highestRating };
  }
}
