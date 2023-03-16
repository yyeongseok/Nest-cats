import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CatRequestDto {
  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'blue',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
