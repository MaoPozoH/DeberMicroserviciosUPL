import { Module } from "@nestjs/common";
import { ClienteProxyVuelos9 } from './client.proxy';

@Module({
    providers:[ClienteProxyVuelos9],
    exports:[ClienteProxyVuelos9],  
})
export class ProxyModule{}