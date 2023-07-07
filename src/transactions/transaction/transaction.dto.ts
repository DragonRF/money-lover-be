import {Wallet} from "../../entities/wallet.entity";
import {SubType} from "../../entities/sub_type.entity";

export class TransactionDto {
note: string;
date: string;
amount: number;
wallet_id: number;
subtype_id: number;
}