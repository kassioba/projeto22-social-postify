import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsUrl()
    text: string

    @IsOptional()
    @IsUrl()
    image: string
}
