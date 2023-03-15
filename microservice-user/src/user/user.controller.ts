import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from './common/constantes';

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly usuarioServicio:UserService){
    }
    @MessagePattern(UserMSG.INSERTAR)
    insertar(@Payload() usuarioDTO:UserDTO){
        return this.usuarioServicio.insertar(usuarioDTO);
    }
    @MessagePattern(UserMSG.TODOS)
    todos()
    {
        return this.usuarioServicio.todos();
    }
    @MessagePattern(UserMSG.UNO)
    uno(@Payload() id:string){
        return this.usuarioServicio.uno(id);
    }
    @MessagePattern(UserMSG.ACTUALIZAR)
    actualizar(@Payload() paylod:any){
        return this.usuarioServicio.actualizar(paylod.id, paylod.usuarioDTO);
    }
   @MessagePattern(UserMSG.ELIMINAR)
    eliminar(@Payload() id:string){
        return this.usuarioServicio.eliminar(id);
    }
}