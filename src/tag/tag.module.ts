import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { TagModel } from "./tag.model";
import { TaskModel } from "../task/task.model";
import { TaskController } from "../task/task.controller";
import { TaskService } from "../task/task.service";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TagModel,
        schemaOptions: {
          collection: 'Tags'
        }
      }
    ]),
    TypegooseModule.forFeature([
      {
        typegooseClass: TaskModel,
        schemaOptions: {
          collection: 'Tasks'
        }
      }
    ]),
  ],
  controllers: [TagController, TaskController],
  providers: [TagService, TaskService]
})
export class TagModule {}
