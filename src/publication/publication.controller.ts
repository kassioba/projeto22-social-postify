import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { ParamsDto } from './dto/params-publication.dto';

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  postPublication(@Body() body: CreatePublicationDto) {
    return this.publicationService.postPublication(body);
  }

  @Get()
  getAllPublications( @Query('published') published: string, @Query('after') after: Date | undefined) {
    return this.publicationService.getAllPublications(published, after ? new Date(after) : after);
  }

  @Get(':id')
  getPublicationById(@Param() { id }: ParamsDto) {
    return this.publicationService.getPublicationById(+id);
  }

  @Put(':id')
  putPublication(@Param() { id }: ParamsDto, @Body() body: UpdatePublicationDto) {
    return this.publicationService.putPublication(+id, body);
  }

  @Delete(':id')
  deletePublication(@Param() { id }: ParamsDto) {
    return this.publicationService.deletePublication(+id);
  }
}
