import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AdminRoleGuard } from 'src/auth/guards/adminRole.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService, private authService: AuthService){}

  // user registration 
  @Post('register')
  async register(@Body() registerPayload: UserRegisterDto): Promise<User> {
    return await this.userService.register(registerPayload);
  }


  // user login 
  @Post('login')
  async login(@Body() loginPayload: LoginDto){
    return this.authService.verifyCredentials(loginPayload)
  }


  // get user profile 
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req){
    return req.user;
  }


  // get all users 
  @UseGuards(JwtAuthGuard,AdminRoleGuard)
  @Get('all')
  async allUsers(){
    return await this.userService.allUsers()
  }
  
}
