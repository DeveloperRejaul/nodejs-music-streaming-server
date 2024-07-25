import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './model';
import { Music } from 'src/services/music/model';

@Injectable()
export class Service {
  constructor(
    @InjectModel(Favorite)
    private readonly model: typeof Favorite,
  ) { }
    
  async create(body) { 
    // check unique favorite song for single user;
    const allFavorite = await this.model.findAll({ where: { userId: body.userId } });
    
    const exists = allFavorite.some(e => e.musicId === body.musicId);
    if (exists) throw new HttpException('Music already exists', HttpStatus.BAD_REQUEST);

    const favorite = new Favorite(body);
    return await favorite.save();
  }


  async getFavorites(id: string) {
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


  async getFavorite(id: string) {
    return await this.model.findOne({ where: { musicId: id } });
  }

  async delete(id: string) {
    return await this.model.destroy({ where: { musicId: id} });
  }
}