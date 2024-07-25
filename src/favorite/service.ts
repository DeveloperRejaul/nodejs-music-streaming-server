import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './model';

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
   
    const favorite = await this.model.findOne({ where: { id: id } });
    console.log(favorite);
    
  }

}