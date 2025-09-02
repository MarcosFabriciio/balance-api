import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
    constructor(private readonly balanceService: BalanceService) { }

    @Get()
    getBalance(@Query('account_id') accountId: string, @Res() res: Response): void {
        const balance: number | null = this.balanceService.getBalance(accountId);
        if (balance === null) {
            res.status(404).send('0');
            return;
        }
        res.status(200).send(balance.toString());
    }
}
