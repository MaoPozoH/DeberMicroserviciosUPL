import { HttpStatus, Injectable } from '@nestjs/common';
import { IPassenger } from './common/interfaces/passenger.interfce';

import { PassengerDTO } from './dto/passanger.dto';
import * as bcrypt from 'bcrypt';
import { PASSENGER } from './common/models/models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PassangerService {
    constructor(@InjectModel(PASSENGER.name) private readonly pasajerorModelo:Model<IPassenger>){}
    
    async crearPasajero(pasajero:string):Promise<string>{
    const generar = await bcrypt.genSalt(10);
    return await bcrypt.hash(pasajero, generar);   
    }

    async insertar (passengerDTO: PassengerDTO):Promise<IPassenger>{
        const nuevoPassenger = new this.pasajerorModelo({...passengerDTO});
        return nuevoPassenger.save();
    }
    async todos():Promise<IPassenger[]>{
        return await this.pasajerorModelo.find();
    }
    async uno(id:string):Promise<IPassenger>{
        return await this.pasajerorModelo.findById(id);
    }
    async actualizar(id: string, passengerDTO:PassengerDTO):Promise<IPassenger>{
        return await this.pasajerorModelo.findByIdAndUpdate(id, passengerDTO, {new:true});
    }
    async eliminar(id:string){
        await this.pasajerorModelo.findByIdAndDelete(id);
        return {status: HttpStatus.OK, msg:'Se eliminó correctamente'};
    }
}



