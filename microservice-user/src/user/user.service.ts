import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
import { IUser } from './common/interfaces/user.interface';
import { USER } from './common/models/models';



@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly usuriomodelo:Model<IUser>){}
    
    async crearPassword(password:string):Promise<string>{
    const generar = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, generar);   
    }

    async insertar (usuarioDTO: UserDTO):Promise<IUser>{
        const encriptada = await this.crearPassword(usuarioDTO.password);
        const nuevoUsuario = new this.usuriomodelo({...usuarioDTO,password:encriptada});
        return nuevoUsuario.save();
    }
    async todos():Promise<IUser[]>{
        return await this.usuriomodelo.find();
    }
    async uno(id:string):Promise<IUser>{
        return await this.usuriomodelo.findById(id);
    }
    async actualizar(id: string, usuarioDTO:UserDTO):Promise<IUser>{
        const encriptada = await this.crearPassword(usuarioDTO.password);
        const nuevoUsuario = new this.usuriomodelo({...usuarioDTO,password:encriptada});
        return await this.usuriomodelo.findByIdAndUpdate(id, usuarioDTO, {new:true});
    }
    async eliminar(id:string){
        await this.usuriomodelo.findByIdAndDelete(id);
        return {status: HttpStatus.OK, msg:'Se eliminó correctamente'};
    }
}