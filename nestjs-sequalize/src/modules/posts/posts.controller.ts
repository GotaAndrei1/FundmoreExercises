import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() postDto: PostDto, @Body('userId') userId: number) {
    return this.postsService.create(postDto, userId);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() postDto: PostDto,
    @Body('userId') userId: number,
  ) {
    return this.postsService.update(id, postDto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Body('userId') userId: number) {
    return this.postsService.delete(id, userId);
  }
}
