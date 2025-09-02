import { Module } from '@nestjs/common';
import { BalanceModule } from 'src/balance/balance.module';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';

@Module({
    imports: [BalanceModule],
    controllers: [ResetController],
    providers: [ResetService],
})
export class ResetModule { }
