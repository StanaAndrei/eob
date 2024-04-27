import { IsNotEmpty } from 'class-validator';
import { OtherUserDTO } from './other.dto';

export class UserDTO extends OtherUserDTO {
  @IsNotEmpty()
  password: string;
}
