import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publication.repository';
import { PostRepository } from 'src/post/post.repository';
import { MediaRepository } from 'src/media/media.repository';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepository: PublicationRepository,
              @Inject(forwardRef(() => PostRepository))
              private postRepository: PostRepository,
              @Inject(forwardRef(() => MediaRepository))
              private mediaRepository: MediaRepository
    ) {}

  async postPublication(body: CreatePublicationDto) {
    const media = await this.mediaRepository.findMediaById(body.mediaId)

    const post = await this.postRepository.selectPostById(body.postId)

    if(!media || !post) throw new NotFoundException('Media or post does not exist.')

    return await this.publicationRepository.insertPublication(body);
  }

  async getAllPublications(published: string, after: Date | undefined) {
    if(after?.toString() === 'Invalid Date') after = undefined

    const { greater, lesser } = this.publishedAndAfterFilter(published, after)

    return await this.publicationRepository.selectAllPublicationsWithFilter(greater, lesser)
  }

  async getPublicationById(id: number) {
    const publication = await this.publicationRepository.selectPublicationById(id)
    
    if(!publication) throw new NotFoundException('Publications does not exist.')

    return publication
  }

  async putPublication(id: number, body: UpdatePublicationDto) {
    const checkPublication = await this.publicationRepository.selectPublicationById(id)

    if(!checkPublication) throw new NotFoundException('Publication does not exist.')

    if(checkPublication.date < new Date()) throw new ForbiddenException('Publication has already been published.')

    const checkMedia = await this.mediaRepository.findMediaById(body.mediaId)

    const checkPost = await this.postRepository.selectPostById(body.postId)

    if(!checkPost || !checkMedia) throw new NotFoundException('Media or post does not exist.')

    if(new Date(body.date) < new Date()) throw new ForbiddenException('Cannot update to a date that has already passed.')

    return await this.publicationRepository.updatePublication(id, body);
  }

  async deletePublication(id: number) {
    const checkPublication = await this.publicationRepository.selectPublicationById(id)

    if(!checkPublication) throw new NotFoundException('Publication does not exist.')

    await this.publicationRepository.deletePublication(id)
  }

  publishedAndAfterFilter(published: string, after: Date | undefined){
    if(published === 'false' && after) return after > new Date() ? { greater: after, lesser: undefined } : { greater: new Date(), lesser: undefined }
    else if(published === 'true' && after) return { greater: after, lesser: new Date() }
    else if(published === 'false') return { greater: new Date(), lesser: undefined }
    else if(published === 'true') return { greater: undefined, lesser: new Date() }
    else if(after) return { greater: after, lesser: undefined }
    else return { greater: undefined, lesser: undefined }
  }
}
