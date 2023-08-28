import { Module, forwardRef } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PublicationModule } from 'src/publication/publication.module';

@Module({
  imports: [forwardRef(() => PublicationModule)],
  exports: [PostRepository],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
