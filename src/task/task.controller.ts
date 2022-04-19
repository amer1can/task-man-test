import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  BadRequestException
} from "@nestjs/common";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TagService } from "../tag/tag.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";
import { TAG_BY_ID_NOT_FOUND } from "./task.constants";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService,
              private readonly tagService: TagService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() createTaskDto: CreateTaskDto) {
    //получаем теги которые хотим добавить
    const { tags } = createTaskDto
    //получаем уже имеющиеся теги
    const alreadyHasTags = await this.tagService.findAll()
      .then(res => res.map(el => el.name))

    //если добавляемого тега нет в нашей коллекции, то добавляем его
    if(tags.length != 0) {
      tags.forEach(el => {
        if(!alreadyHasTags.includes(el)) {
          this.tagService.create({name: el})
        }
      })
    }

    //создаем задачу
    return this.taskService.create(createTaskDto);
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id', IdValidationPipe) id: string) {
    return this.taskService.findById(id);
  }

  @Get('/byTag/:tag')
  findByTag(@Param('tag') tag: string) {
    return this.taskService.findByTag(tag);
  }

  @Get('/byTagId/:id')
  async findByTagId(@Param('id', IdValidationPipe) id: string) {
    //узнаем имя тега по ID
    try {
      const tag = await this.tagService.findById(id).then(res => res.name)
      return this.taskService.findByTag(tag);
    } catch(e) {
      throw new BadRequestException(TAG_BY_ID_NOT_FOUND)
    }
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.taskService.deleteById(id);
  }

  @Patch(':id')
  async update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTaskDto) {
    return this.taskService.updateById(id, dto);
  }
}
