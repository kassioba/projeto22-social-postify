import { Module, forwardRef } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { PublicationModule } from 'src/publication/publication.module';

@Module({
  imports: [forwardRef(() => PublicationModule)],
  exports: [MediaRepository],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
})
export class MediaModule {}
