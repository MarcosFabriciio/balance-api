import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { BalanceService } from '../balance/balance.service';
import { EventDto } from '../common/dto/event.dto';
import { Response } from 'express';

describe('EventController', (): void => {
    let controller: EventController;
    let service: EventService;

    beforeEach(async (): Promise<void> => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventController],
            providers: [EventService, BalanceService],
        }).compile();

        controller = module.get<EventController>(EventController);
        service = module.get<EventService>(EventService);
    });

    it('should be defined', (): void => {
        expect(controller).toBeDefined();
    });

    describe('handleEvent', (): void => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        } as unknown as Response;

        it('should handle a deposit event and return 201', (): void => {
            const event: EventDto = { type: 'deposit', destination: '100', amount: 10 };
            const result = { destination: { id: '100', balance: 10 } };
            jest.spyOn(service, 'handleEvent').mockImplementation(() => result);

            controller.handleEvent(event, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        it('should return 404 with body 0 if event is not handled', (): void => {
            const event: EventDto = { type: 'withdraw', origin: '200', amount: 10 };
            jest.spyOn(service, 'handleEvent').mockImplementation(() => null);

            controller.handleEvent(event, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('0');
        });
    });
});
