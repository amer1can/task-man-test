import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { TaskService } from "../task/task.service";
import { IdValidationPipe } from "../pipes/id-validation.pipe";

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService,
              private readonly taskService: TaskService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get('all')
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.tagService.findById(id);
  }

  @Delete(':id')
  //удаляем тег, а также во всех Tasks в которых он есть
  async remove(@Param('id', IdValidationPipe) id: string) {
    //получаем его имя по id
    const tagName = await this.tagService.findById(id).then(res => res.name)
    //получаем массив всех объектов где он встречается
    const tasksWithTag = await this.taskService.findByTag(tagName)

    //удаляем из массива tags и обновляем Task
    tasksWithTag.forEach(el => {
      const index = el.tags.findIndex(t => t == tagName)
      el.tags.splice(index, 1)
      this.taskService.updateById(el._id.toString(), el)
    })

    return this.tagService.deleteById(id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTagDto) {
    return this.tagService.update(id, dto);
  }
}
