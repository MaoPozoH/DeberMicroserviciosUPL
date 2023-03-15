import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClienteProxyVuelos9 } from '../common/proxy/client.proxy';
import { UserDTO } from './dto/user.dto';
import { Observable } from 'rxjs';
import { UserMSG } from '../common/constantes';
import { IUser } from 'src/common/interface/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Usuarios")
@Controller('api/v2/user')
export class UserController {
    private _clienteProxyUser = this.clienteProxy.clienteProxyUsuarios();
    constructor(private readonly clienteProxy:ClienteProxyVuelos9){}
    @Post()
    insertar(@Body() userDTO:UserDTO):Observable<IUser>{
        return this._clienteProxyUser.send(UserMSG.INSERTAR, userDTO);
    }
    @Get()
    todos():Observable<IUser[]>{
        return this._clienteProxyUser.send(UserMSG.TODOS,'');
    }
    @Get(":id")
    uno(@Param('id') id:string):Observable<IUser>{
        return this._clienteProxyUser.send(UserMSG.UNO,id);
    }
    @Put(":id")
    actualizar(@Param("id") id:string, @Body() userDTO:UserDTO):Observable<IUser>{
        return this._clienteProxyUser.send(UserMSG.ACTUALIZAR,{id, userDTO});
    }
    @Delete(":id")
    eleiminar(@Param("id") id:string):Observable<any>{
        return this._clienteProxyUser.send(UserMSG.ELIMINAR,id);
    }
}