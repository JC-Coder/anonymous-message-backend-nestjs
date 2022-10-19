import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { MessageService } from "src/message/message.service";

@Injectable()
export class UserIsOwnerGuard implements CanActivate {
  constructor(private messageService: MessageService){}


  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = context.switchToHttp().getRequest();
    let message = await this.messageService.findOne(request.params.id);

    if(request.user.userId === message.user.id) return true;

    return false;
  }

}