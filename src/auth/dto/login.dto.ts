import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto { //DTO: Data Transform object
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly password: string;
}
