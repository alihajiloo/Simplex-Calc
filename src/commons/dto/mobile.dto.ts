import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class MobileDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'Mobile Wrong Size' })
  @Matches(/(\+98|0)?9\d{9}/, {
    message:
      'Mobile Number is not valid format: should start with 09 and 11 char length',
  })
  @ApiProperty()
  public readonly mobile: string;

}
