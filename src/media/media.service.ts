import { ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaRepository } from './media.repository';
import { PublicationRepository } from 'src/publication/publication.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository,
              @Inject(forwardRef(() => PublicationRepository))
              private readonly publicationRepository: PublicationRepository) {}

  async postMedia(body: CreateMediaDto) {
    const media = await this.mediaRepository.findCombination(body)

    if(media) throw new ConflictException('Media combination already exists!')

    return await this.mediaRepository.insertMedia(body)
  }

  async getAllMedia() {
    return await this.mediaRepository.findAllMedia()
  }

  async getMediaById(id: number) {
    const media = await this.mediaRepository.findMediaById(id)
    
    if(!media) throw new NotFoundException('Media not found!')

    return media
  }

  async putMedia(id: number, body: UpdateMediaDto) {
    const checkIfExists = await this.mediaRepository.findMediaById(id)

    if(!checkIfExists) throw new NotFoundException('Media not found!')

    const checkCombination = await this.mediaRepository.findCombination(body)
    
    if(checkCombination) throw new ConflictException('Media combination already exists!')

    return await this.mediaRepository.updateMediaById(id, body);
  }

  async deleteMedia(id: number) {
    const checkIfExists = await this.mediaRepository.findMediaById(id)

    if(!checkIfExists) throw new NotFoundException('Media not found!')

    const checkPublication = await this.publicationRepository.findPublicationByMediaId(id)

    if(checkPublication) throw new ForbiddenException('Cannot delete a media that is attached to a publication!')

    await this.mediaRepository.deleteMediaById(id)
  }
}
