import { Global, Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Global()
@Module({
    controllers: [BalanceController],
    providers: [BalanceService],
    exports: [BalanceService],
})
export class BalanceModule { }
