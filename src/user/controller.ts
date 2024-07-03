import { Controller, Get, Post,  Delete, Param, Body,Patch } from '@nestjs/common';
import { UserService } from './service';
import { User} from './model';

@Controller('user')
export class UserController {
  constructor(private readonly productsService: UserService) {}

  @Post()
  create(@Body() productData): Promise<User> {
    return this.productsService.create(productData);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.productsService.findOne(Number(id));
  }

  @Patch(':id') 
  update(@Param('id') id: string, @Body() productData): Promise<[number, User[]]> {
    return this.productsService.update(Number(id), productData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.productsService.remove(Number(id));
  }
}