import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { IFlight } from './common/interface/flight.interface';
import { FLIGHT } from './common/models/models';
import { FlightDTO } from './dto/flight.dto';



@Injectable()
export class VuelosService {
    constructor(@InjectModel(FLIGHT.name) private readonly vuelosModelos:Model<IFlight>){}

    async insertar(flightDTO:FlightDTO):Promise<IFlight>{
        const nuevoVuelo = new this.vuelosModelos(flightDTO);
        return await nuevoVuelo.save()
    }

    async todos():Promise<IFlight[]>{
        return await this.vuelosModelos.find();
    }

    async uno(id:string):Promise<IFlight>{
        return await this.vuelosModelos.findById(id);
    }

    async actualizar(id:string, flightDTO:FlightDTO):Promise<IFlight>{
    return await this.vuelosModelos.findByIdAndUpdate(id,flightDTO,{new:true});    
    }

    async eliminar(id:string){
        await this.vuelosModelos.findByIdAndDelete(id);
        return {status:HttpStatus.OK, msg:'Eliminado'}
    }

    async insertarPasajero(flightDTO:string, pasajeroId:string):Promise<IFlight>
    {
        return await this.vuelosModelos.findByIdAndUpdate(flightDTO,{
            $addToSet:{passenger:pasajeroId}
        },{new: true}).populate('passenger')
    }
}
