import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  postPost(@Body() body: CreatePostDto) {
    return this.postService.postPost(body);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(+id);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postService.updatePost(+id, body);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(+id);
  }
}
