import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from '../balance/balance.service';
import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';

describe('ResetController', (): void => {
    let controller: ResetController;
    let service: ResetService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ResetController],
            providers: [ResetService, BalanceService],
        }).compile();

        controller = module.get<ResetController>(ResetController);
        service = module.get<ResetService>(ResetService);
    });

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('resetState', (): void => {
        it('should call resetService.resetState and return "OK"', (): void => {
            jest.spyOn(service, 'resetState').mockImplementation(() => 'OK');
            expect(controller.resetState()).toBe('OK');
        });
    });
});
