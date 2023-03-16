import { ApiProperty } from '@nestjs/swagger';

export class readonlyCatDto {
  @ApiProperty({
    example: '328802',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'blue',
    description: 'name',
  })
  name: string;
}
