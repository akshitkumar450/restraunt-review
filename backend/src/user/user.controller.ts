import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { createUserSchema, updateUserSchema } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  fetchAllUsers() {
    return this.userService.fetchAllUsers();
  }

  @Post()
  createUser(@Body() body) {
    const { value, error } = createUserSchema.validate(body);
    if (error) throw error;
    return this.userService.createUser(value);
  }

  @Delete('/:id')
  deleteUser(@Param() id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('/:id')
  updateUser(@Param() id: string, @Body() body) {
    const { value, error } = updateUserSchema.validate(body);
    if (error) throw error;
    return this.userService.updateUser(value, id);
  }
}
