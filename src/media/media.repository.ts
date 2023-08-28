import { Injectable } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Injectable()
export class MediaRepository{
    constructor(private readonly prisma: PrismaService) {}

    async insertMedia({username, title}: CreateMediaDto){
        return this.prisma.media.create({
            data: {
                username,
                title
            }
        })
    }

    async findCombination({username, title}: CreateMediaDto){
        return this.prisma.media.findFirst({
            where: {
                username,
                title
            }
        })
    }

    async findAllMedia(){
        return this.prisma.media.findMany({})
    }

    async findMediaById(id: number){
        return this.prisma.media.findUnique({
            where: {
                id
            }
        })
    }

    async updateMediaById(id: number, {username, title}:UpdateMediaDto){
        return this.prisma.media.update({
            where: {
                id
            },
            data: {
                username,
                title
            }
        })
    }

    async deleteMediaById(id: number){
        return this.prisma.media.delete({
            where: {
                id
            }
        })
    }
}