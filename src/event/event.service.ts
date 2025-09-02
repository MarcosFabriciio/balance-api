import { Injectable, Logger } from '@nestjs/common';
import { EventDto } from '../common/dto/event.dto';
import { Account, DepositResult, TransferResult, WithdrawResult } from '../common/interfaces/event.interface';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class EventService {
    private readonly logger = new Logger(EventService.name);

    constructor(private readonly balanceService: BalanceService) { }

    handleEvent(event: EventDto): DepositResult | WithdrawResult | TransferResult | null {
        let result: DepositResult | WithdrawResult | TransferResult | undefined;
        switch (event.type) {
            case 'deposit': {
                if (!event.destination) return null;
                const destination: Account = this.balanceService.deposit(event.destination, event.amount);
                result = { destination };
                break;
            }
            case 'withdraw': {
                if (!event.origin) return null;
                const originWithdraw: Account | null = this.balanceService.withdraw(event.origin, event.amount);
                if (originWithdraw === null) return null;
                result = { origin: originWithdraw };
                break;
            }
            case 'transfer': {
                if (!event.origin || !event.destination) return null;
                const transferResult: { origin: Account; destination: Account } | null = this.balanceService.transfer(event.origin, event.destination, event.amount);
                if (transferResult === null) return null;
                result = transferResult;
                break;
            }
            default:
                return null;
        }

        const accounts: Map<string, number> = this.balanceService.getAccounts();
        this.logger.log(`Accounts state after ${event.type}: ${JSON.stringify(Object.fromEntries(accounts))}`);

        return result;
    }
}
