import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/adminRole.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIsOwnerGuard } from 'src/auth/guards/userIsOwner.guard';
import { UserIsUserGuard } from 'src/auth/guards/userIsUser.guard';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService){}

  // get all messages
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get('/all')
  async getAll(): Promise<Object>{
    return await this.messageService.getAll();
  }

  // create new message 
  @Post('/create/:username')
  async create(@Body('message') message: string, @Param('username') username: string){
    return await this.messageService.create(message, username);
  }

  // get all  messages for user 
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Get('/all/:username')
  async getUserMessage(@Param('username') username: string){
    return await this.messageService.getUserMessage(username);
  }


  // user delete message 
  @UseGuards(JwtAuthGuard, UserIsOwnerGuard)
  @Delete(':id')
  async userDeleteMessage(@Param('id', ParseIntPipe) id: number){
    return await this.messageService.userDeleteMessage(id);
  }

  // find message by id 
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    return await this.messageService.findOne(id);
  }

}
