// wallet.controller.ts
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WalletDto } from './wallet.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { WalletService } from './wallet.service';

@UseGuards(AuthGuard)
@Controller('wallets')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @Post('/')
    async store(@Request() req): Promise<any> {
        try {
            const id = req.user.id;
            await this.walletService.createWallet(req.body, id);
            console.log(id);
            return {
                status: 'success',
                message: 'Create Wallet Success!',
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }

    @Get('/')
    async getWallets(@Request() req) {
        try {
            const id = req.user.id;
            const wallets = await this.walletService.getWalletsByUserId(id);
            return {
                status: 'success',
                data: wallets,
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message,
            };
        }
    }
}