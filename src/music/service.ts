import { Injectable } from '@nestjs/common';
import { Music } from './model';
import { InjectModel } from '@nestjs/sequelize';
import type { CreateMusicDto, UpdateMusicDto } from './dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music)
    private readonly model: typeof Music,
  ) { }
    
  async get() { 
    return await this.model.findAll();  
  }
    
    
  async create(body: CreateMusicDto) { 
    const music = new Music(body);
    return await music.save();
  }
  
  
  async update(id: number, body: UpdateMusicDto) { 
    return await this.model.update(body, { where: {id} ,returning: true, });
  }

  async delete(id: number) {
    return this.model.destroy({ where: {id} });
  }
}