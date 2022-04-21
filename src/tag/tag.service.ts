import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectModel } from "nestjs-typegoose";
import { TagModel } from "./tag.model";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";
import { TaskModel } from "../task/task.model";

@Injectable()
export class TagService {
  constructor(
    @InjectModel(TagModel) private readonly tagModel: ModelType<TagModel>,
    @InjectModel(TaskModel) private readonly taskModel: ModelType<TaskModel>
  ) {}

  async create(createTagDto: CreateTagDto): Promise<DocumentType<TagModel>> {
    // @ts-ignore
    return this.tagModel.create(createTagDto);
  }

  async findAll(): Promise<DocumentType<TagModel>[]> {
    return this.tagModel.find().exec();
  }

  async findById(id: string): Promise<DocumentType<TagModel> | null> {
    return this.tagModel.findById(id).exec();
  }

  async findByTagName(tag: string): Promise<DocumentType<TagModel> | null> {
    const id = await this.tagModel.aggregate()
      .match({ name: { $in: [tag] }})
      .then(res => res.map(el => el._id))
    return this.tagModel.findById(id).exec();
  }

  async deleteByTagName(tag: string): Promise<DocumentType<TagModel> | null> {
    const id = await this.tagModel.aggregate()
      .match({ name: { $in: [tag] }})
      .then(res => res.map(el => el._id))
    return this.tagModel.findByIdAndDelete(id).exec();
  }

  async deleteById(id: string): Promise<DocumentType<TagModel> | null> {
    return this.tagModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, dto: CreateTagDto) {
    return `This action updates a #${id} tag`;
  }

  async updateTags(arr: Array<string>) {
    //получаем уже имеющиеся теги
    const alreadyHasTags = await this.tagModel.find()
      .then(res => res.map(el => el.name))

    //если добавляемого тега нет в нашей коллекции, то добавляем его
    if(arr.length != 0) {
      arr.forEach(el => {
        if(!alreadyHasTags.includes(el)) {
          this.create({name: el})
        }
      })
    }
  }

  async deleteUnusedTags() {
    const names = []
    const tags = await this.tagModel.find().then(res => res.map(el => el.name));
    for (const tag of tags) {
      const res = await this.taskModel.aggregate()
        .match({ tags: { $in: [tag] }})
        .exec();
      if(res.length === 0) {
        await this.deleteByTagName(tag)
        names.push(tag)
      }
    }
    return names
  }
}
