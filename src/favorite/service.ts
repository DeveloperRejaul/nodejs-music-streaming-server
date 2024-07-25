import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './model';
import { Music } from 'src/music/model';

@Injectable()
export class Service {
  constructor(
    @InjectModel(Favorite)
    private readonly model: typeof Favorite,
  ) { }
    
  async create(body) { 
    const favorite = new Favorite(body);
    return await favorite.save();
  }


  async getFavorite(id: string) {
    const favorite = await this.model.findAll({ where: { userId: id } });
    const favoriteMusics = [];
    if (favorite.length <= 0) return favorite;
    // is not good practice, just for testing //  
    for (let i = 0; i < favorite.length; i++) {
      const music = await Music.findOne({ where: { id: favorite[i].musicId } });
      favoriteMusics.push(music);
    }
    return favoriteMusics;
  }

  async delete(id: string) {
    return await this.model.destroy({ where: {id} });
  }
}