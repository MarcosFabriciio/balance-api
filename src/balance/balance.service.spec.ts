import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { Account } from 'src/common/interfaces/event.interface';

describe('BalanceService', (): void => {
    let service: BalanceService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BalanceService],
        }).compile();

        service = module.get<BalanceService>(BalanceService);
    });

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('getBalance', (): void => {
        it('should return null for a non-existing account', (): void => {
            expect(service.getBalance('1234')).toBeNull();
        });

        it('should return the balance for an existing account', (): void => {
            service.deposit('100', 10);
            expect(service.getBalance('100')).toBe(10);
        });
    });

    describe('deposit', (): void => {
        it('should create a new account with the deposit amount', (): void => {
            const result: Account = service.deposit('100', 10);
            expect(result).toEqual({ id: '100', balance: 10 });
            expect(service.getBalance('100')).toBe(10);
        });

        it('should add to the balance of an existing account', (): void => {
            service.deposit('100', 10);
            const result: Account = service.deposit('100', 10);
            expect(result).toEqual({ id: '100', balance: 20 });
            expect(service.getBalance('100')).toBe(20);
        });
    });

    describe('withdraw', (): void => {
        it('should return null for a non-existing account', (): void => {
            expect(service.withdraw('200', 10)).toBeNull();
        });

        it('should subtract from the balance of an existing account', (): void => {
            service.deposit('100', 20);
            const result: Account | null = service.withdraw('100', 5);
            expect(result).toEqual({ id: '100', balance: 15 });
            expect(service.getBalance('100')).toBe(15);
        });
    });

    describe('transfer', (): void => {
        it('should return null for a non-existing origin account', (): void => {
            expect(service.transfer('200', '300', 15)).toBeNull();
        });

        it('should transfer amount from an existing account to a new account', (): void => {
            service.deposit('100', 15);
            const result: { origin: Account; destination: Account } | null = service.transfer('100', '300', 15);
            expect(result).toEqual({
                origin: { id: '100', balance: 0 },
                destination: { id: '300', balance: 15 },
            });
            expect(service.getBalance('100')).toBe(0);
            expect(service.getBalance('300')).toBe(15);
        });
    });

    describe('reset', (): void => {
        it('should clear all accounts', (): void => {
            service.deposit('100', 10);
            service.reset();
            expect(service.getAccounts().size).toBe(0);
        });
    });

    describe('getAccounts', (): void => {
        it('should return the accounts map', (): void => {
            service.deposit('100', 10);
            const accounts: Map<string, number> = service.getAccounts();
            expect(accounts.get('100')).toBe(10);
        });
    });
});
