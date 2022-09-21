import { Module } from '@nestjs/common';
import { AggregateService } from './aggregate.service';
import { AggregateController } from './aggregate.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AggregateController],
  providers: [AggregateService],
  imports:[UserModule]
})


export class AggregateModule {}
