import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class PassengerDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string;
    
}