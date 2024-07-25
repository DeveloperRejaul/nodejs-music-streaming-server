import { Controller, Post, Put, Delete, Get, Body, Param, } from '@nestjs/common';
import { MusicService } from './service';
import { CreateMusicDto, UpdateMusicDto } from './dto';

@Controller('music')
export class MusicController {
  constructor(private readonly service: MusicService) {}

  @Post()
  createMusic(@Body() body: CreateMusicDto) {
    return this.service.create(body);
  }

  @Get()
  getMusic() { 
    return this.service.get();
  }
  
  @Delete(':id')
  deleteMusic(@Param() {id}) { 
    return this.service.delete(+id);
  }
  
  @Put(':id')
  updateMusic(@Param() {id}, @Body() body: UpdateMusicDto) { 
    return this.service.update(+id, body);
  }
}
