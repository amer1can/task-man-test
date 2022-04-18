import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { TaskModel } from "./task.model";
import { TagModel } from "../tag/tag.model";
import { TagController } from "../tag/tag.controller";
import { TagService } from "../tag/tag.service";

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: TaskModel,
      schemaOptions: {
        collection: 'Tasks'
      }
    }]),
    TypegooseModule.forFeature([
      {
        typegooseClass: TagModel,
        schemaOptions: {
          collection: 'Tags'
        }
      }
    ])
  ],
  controllers: [TaskController, TagController],
  providers: [TaskService, TagService]
})
export class TaskModule {}
