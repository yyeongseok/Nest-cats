import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class readonlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '328802',
    description: 'id',
  })
  id: string;
}

//PickType : 클래스 CAT(부모)에서 원하는 키값만 불러오고 싶을때,
//OmitType : <-> PickType
