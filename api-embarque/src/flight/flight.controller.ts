import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { FlightMSG, PassengerMSG } from 'src/common/constantes';
import { IFlight } from 'src/common/interface/flight.interface';
import { ClienteProxyVuelos9 } from 'src/common/proxy/client.proxy';
import { FlightDTO } from './dto/flight.dto';

@ApiTags("Vuelos")
@Controller('api/v2/flight')
export class FlightController {
    constructor(private readonly clienteProxy:ClienteProxyVuelos9){}
    private _clienteProxyFlight = this.clienteProxy.ClienteProxyFlight();
    private _clienteProxyPassenger = this.clienteProxy.ClienteProxyPassenger();

    @Post()
    insertar(@Body() flightDTO:FlightDTO):Observable<IFlight>{
        return this._clienteProxyFlight.send(FlightMSG.INSERTAR,flightDTO);
    }
    @Get()
    todos():Observable<IFlight[]>{
        return this._clienteProxyFlight.send(FlightMSG.TODOS,'');
    }
    @Get(":id")
    uno(@Param('id') id:string):Observable<IFlight>{
        return this._clienteProxyFlight.send(FlightMSG.UNO,id);
    }
    @Put(":id")
    actualizar(@Param("id") id:string, @Body() flightDTO:FlightDTO):Observable<IFlight>{
        return this._clienteProxyFlight.send(FlightMSG.ACTUALIZAR,{id, flightDTO});
    }
    @Delete(":id")
    eleiminar(@Param("id") id:string):Observable<any>{
        return this._clienteProxyFlight.send(FlightMSG.ELIMINAR,id);
    }
    @Post(':flightId/passenger/:passengerId')
    async AgregarPasagero(
        @Param('flightId') flightId:string,
        @Param('passengerId') passengerId:string,
    ){
        const passanger = await this._clienteProxyPassenger.send(PassengerMSG.UNO,passengerId);
        if(!passanger){
            throw new HttpException("El pasagero no existe", HttpStatus.NOT_FOUND);
        }
        return this._clienteProxyFlight.send(FlightMSG.AGREGAR_PASAGERO,{
            flightId,
            passengerId,
        });

    }


}
