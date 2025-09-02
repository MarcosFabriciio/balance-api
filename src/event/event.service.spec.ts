import { Test, TestingModule } from '@nestjs/testing';
import { EventDto } from 'src/common/dto/event.dto';
import { DepositResult, TransferResult, WithdrawResult } from 'src/common/interfaces/event.interface';
import { BalanceService } from '../balance/balance.service';
import { EventService } from './event.service';

type HandleEventResult = DepositResult | WithdrawResult | TransferResult | null;

describe('EventService', (): void => {
    let service: EventService;
    let balanceService: BalanceService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventService, BalanceService],
        }).compile();

        service = module.get<EventService>(EventService);
        balanceService = module.get<BalanceService>(BalanceService);
    });

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('handleEvent', (): void => {
        it('should handle a deposit event', (): void => {
            const event: EventDto = { type: 'deposit', destination: '100', amount: 10 };
            const result: HandleEventResult = service.handleEvent(event);
            expect(result).toEqual({ destination: { id: '100', balance: 10 } });
        });

        it('should handle a withdraw event', (): void => {
            balanceService.deposit('100', 20);
            const event: EventDto = { type: 'withdraw', origin: '100', amount: 5 };
            const result: HandleEventResult = service.handleEvent(event);
            expect(result).toEqual({ origin: { id: '100', balance: 15 } });
        });

        it('should return null for a withdraw from a non-existing account', (): void => {
            const event: EventDto = { type: 'withdraw', origin: '200', amount: 10 };
            expect(service.handleEvent(event)).toBeNull();
        });

        it('should handle a transfer event', (): void => {
            balanceService.deposit('100', 15);
            const event: EventDto = { type: 'transfer', origin: '100', destination: '300', amount: 15 };
            const result: HandleEventResult = service.handleEvent(event);
            expect(result).toEqual({
                origin: { id: '100', balance: 0 },
                destination: { id: '300', balance: 15 },
            });
        });

        it('should return null for a transfer from a non-existing account', (): void => {
            const event: EventDto = { type: 'transfer', origin: '200', destination: '300', amount: 15 };
            expect(service.handleEvent(event)).toBeNull();
        });
    });
});
