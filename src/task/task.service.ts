import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from "nestjs-typegoose";
import { TaskModel } from "./task.model";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { TagModel } from "../tag/tag.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>,
    @InjectModel(TagModel) private readonly tagModel: ModelType<TagModel>
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<DocumentType<TaskModel>> {
    // @ts-ignore
    return this.taskModel.create(createTaskDto);
  }

  async findAll(): Promise<DocumentType<TaskModel>[]> {
    return this.taskModel.find()
  }

  async findById(id: string): Promise<DocumentType<TaskModel> | null> {
    return this.taskModel.findById(id).exec()
  }

  async findByTag(tag: string): Promise<DocumentType<TaskModel>[] | null> {
    return this.taskModel.aggregate()
      .match({ tags: { $in: [tag] }})
      .exec();
  }

  async deleteById(id: string): Promise<DocumentType<TaskModel> | null> {
    return this.taskModel.findByIdAndDelete(id).exec()
  }

  async updateById(id: string, dto: CreateTaskDto) {
    //без дополнительных опций все Update возвращают предыдущую версию документа
    //new: true - возвратит обновленную
    //Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify`
    // option set to false are deprecated.
    return this.taskModel.findByIdAndUpdate(id, dto, { new: true, useFindAndModify: false }).exec();
  }
}
