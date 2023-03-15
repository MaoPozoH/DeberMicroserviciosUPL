import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PASSENGER } from './common/models/models';
import { PassangerController } from './passanger.controller';
import { PassangerService } from './passanger.service';
import { PassengerSchema } from './schema/pasajero.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name:PASSENGER.name,
      useFactory:()=>PassengerSchema,
    }])
  ],
  controllers: [PassangerController],
  providers: [PassangerService]
})
export class PassangerModule {}
