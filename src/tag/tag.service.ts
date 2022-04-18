import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectModel } from "nestjs-typegoose";
import { TagModel } from "./tag.model";
import { ModelType, DocumentType } from "@typegoose/typegoose/lib/types";

@Injectable()
export class TagService {
  constructor(@InjectModel(TagModel) private readonly tagModel: ModelType<TagModel>) {}

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

  async deleteById(id: string): Promise<DocumentType<TagModel> | null> {
    return this.tagModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, dto: CreateTagDto) {
    return `This action updates a #${id} tag`;
  }
}
