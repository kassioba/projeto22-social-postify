import { Transform } from "class-transformer";
import { IsNumber, IsNumberString } from "class-validator";

export class ParamsDto{
    @IsNumberString()
    id: string
}