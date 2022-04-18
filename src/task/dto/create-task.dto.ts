import { IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class TagModelDto {
  @IsString()
  name: string;
}

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  // @IsArray()
  // @ValidateNested()
  // @Type(()=> TagModelDto)
  // tags: TagModelDto[]

  @IsArray()
  @IsString({each: true})
  tags: string[]
}
