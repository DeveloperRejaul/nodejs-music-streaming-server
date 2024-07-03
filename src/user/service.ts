import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from './model';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {}


  /**
   * @description This function using for creating user . 
   * @param data parameters should be object this object contains name,email,password   
   * @returns User object 
   */
  async create(data: CreateUserDto): Promise<User> {
    try {
      // check if user already exists
      const foundUser = await this.userModel.findOne({
        where: { email: data.email },
      });
      if (foundUser) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
     

      // generate hash of user password
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(data.password, salt);

      // create new user and save database
      const user = new User({ ...data, password: hash });
      return await user.save();
    } catch (error) {
      return error;
    }
  }


  /**
   * @description This function using for login user . 
   * @param data parameters should be object this object contains email,password   
   * @returns User object 
   */
  async login(data: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({ where: { email: data.email }, });
      if (!user) throw new HttpException('Email or password invalid', HttpStatus.BAD_REQUEST);

      const isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
        const payload = { email: user.email, name: user.name };
        const access_token = await this.jwtService.signAsync(payload);
        return {...user.toJSON(), access_token};
      }
      throw new HttpException('Email or password invalid',HttpStatus.BAD_REQUEST);
    } catch (error) {
      return error;
    }
  }

  /**
   * @description This function using for update user . 
   * @param id parameters should be object this object contains user id;
   * @param data parameters should be object this object contains user name,email,password;
   * @returns User object 
   */
  async update(id: number , data: UpdateUserDto): Promise<User> { 
    try {
      const [numberOfAffectedRows, [updatedUsers]] = await this.userModel.update(data, {
        where: { id },
        returning: true, 
      });

      if (numberOfAffectedRows === 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    
      return updatedUsers;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description This function using for delete user . 
   * @param id parameters should be object this object contains user id;
   * @returns User object 
   */
  async remove(id: number): Promise<number> {
    try {
      return this.userModel.destroy({ where: { id } });
    } catch (error) {
      return error;
    }
  }


  /**
   * @description This function using for find all user . 
   * @returns User object 
   */
  async findAll() { 
    try {
      const users = await this.userModel.findAll();
      if (users.length <= 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return users;
    } catch (error) {
      return error;
    }
  }
  
  /**
   * @description This function using for find single user . 
   * @param id parameters should be object this object contains user id;
   * @returns User object 
   */
  async find(id: number) { 
    try {
      const user = await this.userModel.findByPk(id);
      if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description This function using for find authorize user . 
   * @param id parameters should be object this object contains user token;
   * @returns User object 
   */

  async auth(token: string) { 
    try {
      const decode = this.jwtService.decode(token);
      if (!decode) throw new HttpException('Authorization failed', HttpStatus.UNAUTHORIZED);

      const user = await this.userModel.findOne({ where: { email: decode.email } });
      if (!user) throw new HttpException('Authorization failed', HttpStatus.UNAUTHORIZED);
      
      return user;
    } catch (error) {
      return error;
    }
  } 
}
