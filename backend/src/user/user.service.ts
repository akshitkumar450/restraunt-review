import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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
      // console.log(userTobeUpdated, 'old user');
      // console.log(data, 'old data');
      if (data.password !== '') {
        const salt = await bcrypt.genSalt();
        const newHashedPassword = await bcrypt.hash(data.password, salt);
        data.password = newHashedPassword;
      } else {
        data.password = userTobeUpdated.password;
      }
      // console.log(data, 'new data');
      // console.log(userTobeUpdated, 'new user');
      Object.assign(userTobeUpdated, data);
      return User.save(userTobeUpdated);
    } else {
      throw new NotFoundException();
    }
  }

  async signupUser(data) {
    const { name, email, password } = data;
    const checkUser = await User.findOne({ email });
    if (checkUser) throw new BadRequestException('email already in use');
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return User.save(user);
  }

  async loginUser(data) {
    const { email, password } = data;
    const user = await User.findOne({ email });

    if (!user) throw new NotFoundException(`no user found with ${email} email`);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new NotFoundException('email or password do not match');
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      'my-super-secret-string',
      {
        expiresIn: '1d',
      },
    );
    return { ...user, token };
  }

  async findById(id) {
    const user = await User.findOne(id);
    if (!user) throw new NotFoundException(`no user found with ${id} email`);
    return user;
  }
}
