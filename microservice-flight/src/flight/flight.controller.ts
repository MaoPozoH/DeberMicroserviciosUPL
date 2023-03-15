import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { FlightMSG } from './common/constantes';
import { FlightDTO } from './dto/flight.dto';

import { VuelosService } from './flight.service';


@Controller()
export class FlightController {
    constructor(private readonly vuelosServicio:VuelosService){
    }
    @MessagePattern()
    insertar(@Payload() flightDTO:FlightDTO){
        return this.vuelosServicio.insertar(flightDTO);
    }
    @MessagePattern(FlightMSG.TODOS)
    todos()
    {
        return this.vuelosServicio.todos();
    }
    @MessagePattern(FlightMSG.UNO)
    uno(@Payload() id:string){
        return this.vuelosServicio.uno(id);
    }
    @MessagePattern(FlightMSG.ACTUALIZAR)
    actualizar(@Payload() paylod:any){
        return this.vuelosServicio.actualizar(paylod.id, paylod.flightDTO);
    }
    @MessagePattern(FlightMSG.ELIMINAR)
    eliminar(@Payload() id:string){
        return this.vuelosServicio.eliminar(id);
    }
}
    

