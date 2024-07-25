import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { Service } from './service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly service: Service) {}

  @Post()
  createFavorite(@Body() body) {
    return this.service.create(body);
  }

  @Get(':id')
  getFavorite(@Param() {id}) {
    return this.service.getFavorite(id);
  } 
}
