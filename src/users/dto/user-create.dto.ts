import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { FieldType } from '../enum/field.enum';
import { GenderType } from '../enum/gender.enum';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public readonly lastName: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])[^\s]{8,20}$/, {
    message: 'password too weak must have a Lowercase & Uppercase & Number character',
  })
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  public readonly entrance: number;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'Mobile Wrong Size' })
  @Matches(/(\+98|0)?9\d{9}/, {
    message: 'Mobile Number is not valid format: should start with 09 and 11 char length',
  })
  @ApiProperty()
  public readonly mobile: string;

  @IsNotEmpty()
  @IsEnum(FieldType)
  @ApiProperty({ enum: FieldType })
  public readonly field: FieldType;

  @IsNotEmpty()
  @IsEnum(GenderType)
  @ApiProperty({ enum: GenderType })
  public readonly gender: GenderType;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, { message: 'NationalId Wrong Size' })
  @ApiProperty()
  public readonly nationalId: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 10, { message: 'StuId Wrong Size' })
  @ApiProperty()
  public readonly stuId: string;
}
