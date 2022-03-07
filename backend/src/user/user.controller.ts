import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUserInterceptor } from './interceptor/current-user.interceptor';
import {
  createUserSchema,
  loginUserSchema,
  signUpUserSchema,
  updateUserSchema,
} from './schemas/user.schema';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  fetchAllUsers(@Query() query) {
    return this.userService.fetchAllUsers(query);
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

  @Post('/signup')
  signupUser(@Body() body) {
    const { value, error } = signUpUserSchema.validate(body);
    if (error) throw error;
    return this.userService.signupUser(body);
  }

  @Post('/login')
  loginUser(@Body() body) {
    const { value, error } = loginUserSchema.validate(body);
    if (error) throw error;
    return this.userService.loginUser(value);
  }

  @Get('/whoami')
  @UseInterceptors(CurrentUserInterceptor)
  // @UseGuards(AuthGuard)
  getUser(@CurrentUser() user: User) {
    // user is the current logged in user
    return user;
  }
}
