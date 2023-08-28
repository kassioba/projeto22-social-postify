import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostRepository{
    constructor(private readonly prisma: PrismaService){ }

    insertPost({ title, text, image }: CreatePostDto){
        return this.prisma.post.create({
            data: {
                title,
                text,
                image
            }
        })
    }

    selectAllPosts(){
        return this.prisma.post.findMany({})
    }

    selectPostById(id: number){
        return this.prisma.post.findUnique({
            where: {
                id
            }
        })
    }

    updatePost(id: number, { text, title, image }: UpdatePostDto){
        return this.prisma.post.update({
            where: {
                id
            },
            data: {
                image,
                text,
                title
            }
        })
    }

    deletePost(id: number){
        return this.prisma.post.delete({
            where: {
                id
            }
        })
    }
}