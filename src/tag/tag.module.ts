import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypegooseModule } from "nestjs-typegoose";
import { TagModel } from "./tag.model";

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TagModel,
        schemaOptions: {
          collection: 'Tags'
        }
      }
    ])
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
