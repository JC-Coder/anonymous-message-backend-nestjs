import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService){}

  // verify user credential 
  async verifyCredentials(loginPayload){
    let user = await this.userService.findByUsername(loginPayload.username)

    if(!user){
      throw new BadRequestException("Invalid credentials")
    } else {
      let passwordMatch = await bcrypt.compare(loginPayload.password, user.password);

      if(!passwordMatch) throw new BadRequestException("Incorrect credentials ")

      return this.generateJwt(user);
    }
  }


  async generateJwt(user: User){
    let payload = {username: user.username, sub: user.id, role: user.role};

    return {accessToken: this.jwtService.sign(payload)}
  }
}
