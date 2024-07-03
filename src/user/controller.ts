import { Controller, Post, Body, HttpCode, Put, Param, Delete, Get, Headers } from '@nestjs/common';
import { UserService } from './service';
import { User } from './model';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('auth')
  auth(@Headers() headers) {
    return this.userService.auth(headers.authorization);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @Get(':id')
  find(@Param('id') id) {
    return this.userService.find(Number(id));
  }

  
  @Post()
  @HttpCode(201)
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  
  
  @Put(':id')
  update(@Param('id') id , @Body() body: UpdateUserDto) { 
    return this.userService.update(Number(id), body);
  }
  
  @Delete(':id')
  delete(@Param('id') id) { 
    return this.userService.remove(Number(id));
  }
}
