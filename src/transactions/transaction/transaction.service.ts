// transaction.service.ts
import { Injectable } from '@nestjs/common';
import { TransactionDto } from './transaction.dto';
import { Wallet } from '../../entities/wallet.entity';
import { Transactions } from '../../entities/transactions.entity';
import {SubType} from "../../entities/sub_type.entity";
@Injectable()
export class TransactionService {
  async createTransaction(transactionDto: TransactionDto ) {
    const { note, date, amount, subtype_id, wallet_id } = transactionDto;

    const currentWallet: Wallet = await Wallet.findOne({
      where: { id: wallet_id },
    });
    const currentSubtype: SubType = await SubType.findOne({
      where: {id: subtype_id}
    })
    const transactionEntity: Transactions = Transactions.create();
    transactionEntity.note = note;
    transactionEntity.date = date;
    transactionEntity.amount = amount;
    transactionEntity.wallet = currentWallet;
    transactionEntity.subtype = currentSubtype;
    await transactionEntity.save();
    return transactionEntity;
  }

  async getTransactionByWalletId(walletId: number): Promise<Transactions[]> {
    const currentWallet: Wallet = await Wallet.findOne({
      where: { id: walletId },
      relations: ['transactions'],
    });
    return currentWallet.transactions;
  }

  async deleteTransactionById(transactionId: number): Promise<any> {
    const transaction = await Transactions.findOne({
      where: { id: transactionId },
    });
    await transaction.remove();
  }
}
