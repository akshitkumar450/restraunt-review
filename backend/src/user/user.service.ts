import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  fetchAllUsers() {
    return User.find();
  }

  createUser(data) {
    const newUser = User.create(data);
    return User.save(newUser);
  }

  async deleteUser(id) {
    const userTobeDeleted = await User.findOne(id);
    if (userTobeDeleted) {
      await User.remove(userTobeDeleted);
    } else {
      throw new NotFoundException();
    }
  }
  async updateUser(data, id) {
    const userTobeUpdated = await User.findOne(id);
    if (userTobeUpdated) {
      Object.assign(userTobeUpdated, data);
      return User.save(userTobeUpdated);
    } else {
      throw new NotFoundException();
    }
  }
}
