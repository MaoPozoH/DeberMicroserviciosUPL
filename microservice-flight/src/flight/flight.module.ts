import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FLIGHT } from './common/models/models';
import { FlightController } from './flight.controller';
import { VuelosService } from './flight.service';
import { FlightSchema } from './schema/flight.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name:FLIGHT.name,
      useFactory:()=>FlightSchema,
    }])
  ],
  controllers: [FlightController],
  providers: [VuelosService]
})
export class FlightModule {}
