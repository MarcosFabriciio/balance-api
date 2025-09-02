export class EventDto {
	type: 'deposit' | 'withdraw' | 'transfer';
	destination?: string;
	origin?: string;
	amount: number;
}
