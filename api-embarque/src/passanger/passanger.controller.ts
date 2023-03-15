import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/constantes';
import { IPassenger } from 'src/common/interface/passenger.interface';
import { ClienteProxyVuelos9 } from 'src/common/proxy/client.proxy';
import { PassengerDTO } from './dto/passanger.dto';

@ApiTags("Pasajeros")
@Controller('api/v2/passanger')
export class PassangerController {
    constructor(private readonly clienteProxy:ClienteProxyVuelos9){}
    private _clienteProxyPassenger = this.clienteProxy.ClienteProxyPassenger();

    @Post()
    insertar(@Body() passengerDTO:PassengerDTO):Observable<IPassenger>{
        return this._clienteProxyPassenger.send(PassengerMSG.INSERTAR,passengerDTO);
    }
    @Get()
    todos():Observable<IPassenger[]>{
        return this._clienteProxyPassenger.send(PassengerMSG.TODOS,'');
    }
    @Get(":id")
    uno(@Param('id') id:string):Observable<IPassenger>{
        return this._clienteProxyPassenger.send(PassengerMSG.UNO,id);
    }
    @Put(":id")
    actualizar(@Param("id") id:string, @Body() passengerDTO:PassengerDTO):Observable<IPassenger>{
        return this._clienteProxyPassenger.send(PassengerMSG.ACTUALIZAR,{id, passengerDTO});
    }
    @Delete(":id")
    eleiminar(@Param("id") id:string):Observable<any>{
        return this._clienteProxyPassenger.send(PassengerMSG.ELIMINAR,id);
    }

}
