import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { PassengerMSG } from './common/constantes';

import { PassengerDTO } from './dto/passanger.dto';
import { PassangerService } from './passanger.service';


@Controller()
export class PassangerController {
    constructor(private readonly usuarioServicio:PassangerService){
    }
    @MessagePattern(PassengerMSG.INSERTAR)
    insertar(@Payload() passengerDTO:PassengerDTO){
        return this.usuarioServicio.insertar(passengerDTO);
    }
    @MessagePattern(PassengerMSG.TODOS)
    todos()
    {
        return this.usuarioServicio.todos();
    }
    @MessagePattern(PassengerMSG.UNO)
    uno(@Payload() id:string){
        return this.usuarioServicio.uno(id);
    }
    @MessagePattern(PassengerMSG.ACTUALIZAR)
    actualizar(@Payload() paylod:any){
        return this.usuarioServicio.actualizar(paylod.id, paylod.usuarioDTO);
    }
   @MessagePattern(PassengerMSG.ELIMINAR)
    eliminar(@Payload() id:string){
        return this.usuarioServicio.eliminar(id);
    }
}
