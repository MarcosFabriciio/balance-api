import { Injectable } from '@nestjs/common';
import { Account } from '../common/interfaces/event.interface';

@Injectable()
export class BalanceService {
    private readonly accounts: Map<string, number> = new Map();

    getBalance(accountId: string): number | null {
        if (this.accounts.has(accountId)) {
            return this.accounts.get(accountId) ?? null;
        }
        return null;
    }

    deposit(accountId: string, amount: number): Account {
        const currentBalance: number = this.accounts.get(accountId) || 0;
        const newBalance: number = currentBalance + amount;
        this.accounts.set(accountId, newBalance);
        return { id: accountId, balance: newBalance };
    }

    withdraw(accountId: string, amount: number): Account | null {
        if (!this.accounts.has(accountId)) {
            return null;
        }
        const currentBalance: number = this.accounts.get(accountId) as number;
        const newBalance: number = currentBalance - amount;
        this.accounts.set(accountId, newBalance);
        return { id: accountId, balance: newBalance };
    }

    transfer(fromAccountId: string, toAccountId: string, amount: number): { origin: Account; destination: Account } | null {
        if (!this.accounts.has(fromAccountId)) {
            return null;
        }
        const fromBalance: Account | null = this.withdraw(fromAccountId, amount);
        if (fromBalance === null) {
            return null;
        }
        const toBalance: Account = this.deposit(toAccountId, amount);
        return { origin: fromBalance, destination: toBalance };
    }

    reset(): void {
        this.accounts.clear();
    }

    getAccounts(): Map<string, number> {
        return this.accounts;
    }
}
