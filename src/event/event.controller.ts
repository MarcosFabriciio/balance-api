import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DepositResult, TransferResult, WithdrawResult } from '../common/interfaces/event.interface';
import { EventDto } from '../common/dto/event.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Post()
    handleEvent(@Body() eventDto: EventDto, @Res() res: Response): void {
        const result: DepositResult | WithdrawResult | TransferResult | null = this.eventService.handleEvent(eventDto);
        if (result === null) {
            res.status(404).send('0');
            return;
        }
        res.status(HttpStatus.CREATED).json(result);
    }
}
