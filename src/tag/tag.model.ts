import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";

export interface TagModel extends Base {}
export class TagModel extends TimeStamps {

  @prop()
  name: string;

}
