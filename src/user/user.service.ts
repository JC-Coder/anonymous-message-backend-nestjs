import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  // user register 
  async register(registerPayload): Promise<User>{

    let usernameExists = await this.findByUsername(registerPayload.username);

    if(usernameExists) {
      throw new BadRequestException("user with this username already exists")
    } else {
      const newUser: User = await this.userRepository.create({
        username: registerPayload.username,
        password: await bcrypt.hash(registerPayload.password, 12)
      });

      let result = await this.userRepository.save(newUser);
      delete result.password;

      return result;
    }


  }

  // find user via username 
  async findByUsername(username): Promise<User>{
    let result = await this.userRepository.findOne({
      where: {username: username}
    });

    return result;
  }


  // get all users 
  async allUsers(){
    let result = await this.userRepository.find()
    let totalUsers =  await this.userRepository.count()
    result.forEach(item => delete item.password);

    return {result, totalUsers};
  }
}
