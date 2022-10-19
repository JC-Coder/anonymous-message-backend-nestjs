import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private messageRepository: Repository<Message>, @InjectRepository(User) private userRepository: Repository<User>, private userService: UserService){}


  // get all messages 
  async getAll(): Promise<Object>{
    let result = await this.messageRepository.find();
    let totalMessages = await this.messageRepository.count();

    return {result, totalMessages};
  }


  // create new message 
  async create(message, username){
    let user = await this.userService.findByUsername(username);

    if(!user) throw new BadRequestException("no user with this username exist")

    let newMessage = await this.messageRepository.create({
      message: message,
      user: user
    });

    let result = await this.messageRepository.save(newMessage);
    delete result.user.password

    return result;
  }

  // get all  messages for user 
  async getUserMessage(username){
    
    let result = await this.userRepository.createQueryBuilder('u').leftJoinAndSelect('u.messages', 'um').where('u.username = :username', {username: username}).loadRelationCountAndMap('u.totalMessages', 'u.messages').getMany();


    result.map(item => delete item.password);
    return result
  }


  // user delete message 
  async userDeleteMessage(id){
    let result = await this.messageRepository.delete(id)

    if(result.affected == 0) throw new NotFoundException("message with id " +id+ " not found ");

    return result;
  }


  // find message by id 
  async findOne(id){
    let result =  await this.messageRepository.findOne({
      where: {id: id},
      relations: ['user']
    })

    if(!result) throw new NotFoundException(`message not found`)

    return result;
  }

}
