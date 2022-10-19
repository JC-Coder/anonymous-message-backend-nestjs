import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Roles } from "src/user/entities/user.entity";

@Injectable()
export class AdminRoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext) :Promise<boolean>  {
    let request = context.switchToHttp().getRequest()

    if(request.user.role === Roles.ADMIN) return true;

    return false
  }

}