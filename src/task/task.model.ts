import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { prop } from "@typegoose/typegoose";
import { TagModel } from "../tag/tag.model";

export interface TaskModel extends Base {}
export class TaskModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  description: string

  @prop({type: () => [String]})
  tags: string[]

  // @prop({type: () => [TagModel], _id: false})
  // tags: TagModel[]

}
