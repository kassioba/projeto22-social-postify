import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  async postMedia(@Body() body: CreateMediaDto) {
    return this.mediaService.postMedia(body)
  }

  @Get()
  getAllMedia() {
    return this.mediaService.getAllMedia();
  }

  @Get(':id')
  getMediaById(@Param('id') id: string) {
    return this.mediaService.getMediaById(+id);
  }

  @Put(':id')
  putMedia(@Param('id') id: string, @Body() body: UpdateMediaDto) {
    return this.mediaService.putMedia(+id, body);
  }

  @Delete(':id')
  deleteMedia(@Param('id') id: string) {
    return this.mediaService.deleteMedia(+id);
  }
}
