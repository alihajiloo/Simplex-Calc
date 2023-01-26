import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { FieldType } from '../enum/field.enum';
import { GenderType } from '../enum/gender.enum';

export class UserRo {
  @ApiProperty()
  @IsString()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly mobile: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly firstName: string;

  @ApiProperty()
  @IsString()
  @Expose()
  public readonly lastName: string;

  @ApiProperty()
  @IsNumber()
  @Expose()
  public readonly entrance: Number;

  @IsEnum(FieldType)
  @Expose()
  @ApiProperty({ enum: FieldType })
  public readonly field: FieldType;

  @IsEnum(GenderType)
  @Expose()
  @ApiProperty({ enum: GenderType })
  public readonly gender: GenderType;

  @IsString()
  @ApiProperty()
  public readonly nationalId: string;

  @IsString()
  @ApiProperty()
  public readonly stuId: string;

  @Exclude()
  readonly password: string;

  @Exclude()
  readonly createdAt: string;

  @Exclude()
  readonly updatedAt: string;
}
