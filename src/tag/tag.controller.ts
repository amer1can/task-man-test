import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from "@nestjs/common";
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

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
  findOne(@Param('id') id: string) {
    return this.tagService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.deleteById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateTagDto) {
    return this.tagService.update(id, dto);
  }
}
