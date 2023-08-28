import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { PublicationRepository } from 'src/publication/publication.repository';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository,
                @Inject(forwardRef(() => PublicationRepository))
                private readonly publicationRepository: PublicationRepository) {}

  async postPost(body: CreatePostDto) {
    const post = await this.postRepository.insertPost(body);

    if(!post.image) delete post.image

    return post
  }

  async getAllPosts() {
    const posts = await this.postRepository.selectAllPosts();
    
    posts.forEach(post => {
      if(!post.image) delete post.image
    });
    
    return posts
  }

  async getPostById(id: number) {
    const post = await this.postRepository.selectPostById(id)
    
    if(!post) throw new NotFoundException('Post does not exist.')

    if(!post.image) delete post.image

    return post
  }

  async updatePost(id: number, body: UpdatePostDto) {
    const post = await this.postRepository.selectPostById(id)
    
    if(!post) throw new NotFoundException('Post does not exist.')

    const postUpdated = await this.postRepository.updatePost(id, body)
    
    if(!postUpdated.image) delete postUpdated.image

    return postUpdated;
  }

  async deletePost(id: number) {
    const post = await this.postRepository.selectPostById(id)
    
    if(!post) throw new NotFoundException('Post does not exist.')

    const checkPublication = await this.publicationRepository.findPublicationByPostId(id)

    if(checkPublication) throw new ForbiddenException('Cannot delete a media that is attached to a publication!')
    
    await this.postRepository.deletePost(id);
  }
}
