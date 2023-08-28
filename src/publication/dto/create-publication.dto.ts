import { IsDate, IsISO8601, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePublicationDto {
    @IsNotEmpty()
    @IsNumber()
    mediaId: number

    @IsNotEmpty()
    @IsNumber()
    postId: number

    @IsNotEmpty()
    @IsISO8601()
    date: Date
}
