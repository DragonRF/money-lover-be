//transaction.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { WalletDto } from './wallet.dto';
import { AuthGuard } from '../../auth/auth.guard';
// import { WalletService } from './wallet.service';
import { TransactionService } from './transaction.service';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/')
  async store( @Request() req): Promise<any> {
    try {
      await this.transactionService.createTransaction(req.body);
      return {
        status: 'success',
        message: 'Create Transaction Success!',
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Get('/')
  async getTransactions(@Request() req) {
    try {
      const id = req.wallet.id;
      const transactions =
        await this.transactionService.getTransactionByWalletId(id);
      return {
        status: 'success',
        data: transactions,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Delete('/:id')
  async deleteTransaction(@Param() param: any) {
    try {
      const transactionId = param.id;
      await this.transactionService.deleteTransactionById(transactionId);
      return {
        status: 'success',
        message: 'Delete transaction success!',
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
