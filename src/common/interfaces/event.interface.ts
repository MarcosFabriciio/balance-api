export interface Account {
    id: string;
    balance: number;
}

export interface DepositResult {
    destination: Account;
}

export interface WithdrawResult {
    origin: Account;
}

export interface TransferResult {
    origin: Account;
    destination: Account;
}
