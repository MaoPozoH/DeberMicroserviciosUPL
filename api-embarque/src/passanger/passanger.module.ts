import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { PassangerController } from './passanger.controller';
import { PassangerService } from './passanger.service';

@Module({
  imports:[ProxyModule],
  controllers: [PassangerController],
  providers: [PassangerService]
})
export class PassangerModule {}
