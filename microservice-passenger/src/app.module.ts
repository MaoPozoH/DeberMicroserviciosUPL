import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassangerModule } from './passanger/passanger.module';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath:['.env.development'], isGlobal:true
  }), MongooseModule.forRoot(process.env.URI_MONGO) ,PassangerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
