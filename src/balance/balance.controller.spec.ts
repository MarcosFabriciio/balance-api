import { Test, TestingModule } from '@nestjs/testing';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { Response } from 'express';

describe('BalanceController', (): void => {
    let controller: BalanceController;
    let service: BalanceService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BalanceController],
            providers: [BalanceService],
        }).compile();

        controller = module.get<BalanceController>(BalanceController);
        service = module.get<BalanceService>(BalanceService);
    });

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('getBalance', (): void => {
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as unknown as Response;

        it('should return 404 with body 0 for a non-existing account', (): void => {
            jest.spyOn(service, 'getBalance').mockImplementation(() => null);
            controller.getBalance('1234', res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('0');
        });

        it('should return 200 with balance for an existing account', (): void => {
            jest.spyOn(service, 'getBalance').mockImplementation(() => 20);
            controller.getBalance('100', res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('20');
        });
    });
});
