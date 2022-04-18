import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TagService } from "../tag/tag.service";

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
    tags.forEach(el => {
      if(!alreadyHasTags.includes(el)) {
        this.tagService.create({name: el})
      }
    })

    //создаем задачу
    return this.taskService.create(createTaskDto);
  }

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Get('/byTag/:tag')
  findByTag(@Param('tag') tag: string) {
    return this.taskService.findByTag(tag);
  }

  @Get('/byTagId/:id')
  async findByTagId(@Param('id') id: string) {
    //узнаем имя тега по ID
    const tag = await this.tagService.findById(id).then(res => res.name)
    return this.taskService.findByTag(tag);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.deleteById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateTaskDto) {
    return this.taskService.updateById(id, dto);
  }
}
