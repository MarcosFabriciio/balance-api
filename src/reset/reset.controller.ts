import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResetService } from './reset.service';

@Controller('reset')
export class ResetController {
	constructor(private readonly resetService: ResetService) { }

	@Post()
	@HttpCode(HttpStatus.OK)
	resetState(): string {
		return this.resetService.resetState();
	}
}
