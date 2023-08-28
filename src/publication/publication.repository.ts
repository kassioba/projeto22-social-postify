import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Injectable()
export class PublicationRepository{
    constructor(private readonly prisma: PrismaService) {}

    findPublicationByMediaId(id: number){
        return this.prisma.publication.findFirst({
            where: {
                mediaId: id
            }
        })
    }

    findPublicationByPostId(id: number){
        return this.prisma.publication.findFirst({
            where: {
                postId: id
            }
        })
    }

    insertPublication({ postId, mediaId, date }: CreatePublicationDto){
        return this.prisma.publication.create({
            data: {
                mediaId,
                postId,
                date
            }
        })
    }

    selectAllPublicationsWithFilter(gt: Date | undefined, lt: Date){
        return this.prisma.publication.findMany({
            where: {
                date: {
                    gt,
                    lt
                }
            }
        })
    }

    selectPublicationById(id: number){
        return this.prisma.publication.findUnique({
            where: {
                id
            }
        })
    }

    updatePublication(id: number, { date, mediaId, postId }: UpdatePublicationDto){
        return this.prisma.publication.update({
            where: {
                id
            },
            data: {
                mediaId,
                postId,
                date
            }
        })
    }

    deletePublication(id: number){
        return this.prisma.publication.delete({
            where: {
                id
            }
        })
    }
}