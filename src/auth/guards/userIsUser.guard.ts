import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserIsUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean>{
   const request = context.switchToHttp().getRequest()
   const user = request.user;

   if(user.username === request.params.username) return true;

   return false;
  }

}