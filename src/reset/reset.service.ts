import { Injectable } from '@nestjs/common';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class ResetService {
    constructor(private readonly balanceService: BalanceService) { }

    resetState(): string {
        this.balanceService.reset();
        return 'OK';
    }
}
