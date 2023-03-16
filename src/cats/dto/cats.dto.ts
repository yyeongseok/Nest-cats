import { ApiProperty } from "@nestjs/swagger";
import { Cat } from "../cats.schema";

export class readonlyCatDto {
  @ApiProperty({
    example: "328802",
    description: "id",
  })
  id: string;
}
