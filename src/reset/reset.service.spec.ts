import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from '../balance/balance.service';
import { ResetService } from './reset.service';

describe('ResetService', (): void => {
    let service: ResetService;
    let balanceService: BalanceService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ResetService, BalanceService],
        }).compile();

        service = module.get<ResetService>(ResetService);
        balanceService = module.get<BalanceService>(BalanceService);
    });

    it('should be defined', (): void => {
        expect(service).toBeDefined();
    });

    describe('resetState', (): void => {
        it('should call balanceService.reset and return "OK"', (): void => {
            const resetSpy: jest.SpyInstance = jest.spyOn(balanceService, 'reset');
            expect(service.resetState()).toBe('OK');
            expect(resetSpy).toHaveBeenCalled();
        });
    });
});
