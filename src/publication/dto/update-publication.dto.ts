import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends CreatePublicationDto {
    constructor(){
        super()
    }
}
