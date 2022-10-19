import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { utils } from "src/config/utils";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private userService: UserService){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: utils.jwt_secret
    });
  }

  async validate(payload: any){
    let user = await this.userService.findByUsername(payload.username)

    return {userId: payload.sub, username: payload.username, role: payload.role, joinedAt: user.joinedDate}
  }
}