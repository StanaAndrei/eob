import { IsEmail, IsNotEmpty } from 'class-validator';

export class OtherUserDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
