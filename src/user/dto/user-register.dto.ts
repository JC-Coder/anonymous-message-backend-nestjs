import { IsNotEmpty, Length } from 'class-validator';
export class UserRegisterDto {
  @IsNotEmpty()
  @Length(3, 30)
  username: string;

  @IsNotEmpty()
  @Length(3, 10)
  password: string;
}