import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRo { //RO: Response Object
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public token: string;
}
