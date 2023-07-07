// wallet.service.ts
import {Injectable} from '@nestjs/common';
import {WalletDto} from './wallet.dto';
import {Wallet} from '../../entities/wallet.entity';
import {User} from '../../entities/user.entity';

@Injectable()
export class WalletService {
    async createWallet(walletDto: WalletDto, userId) {
        const currentUser: User = await User.findOne({where: {id: userId}});
        const {name, currency, initialBalance} = walletDto;
        const walletEntity: Wallet = Wallet.create();
        walletEntity.name = name;
        walletEntity.currency = currency;
        walletEntity.initialBalance = initialBalance;
        walletEntity.user = currentUser;
        await walletEntity.save();
        return walletEntity;
    }

    async getWalletsByUserId(userId: number): Promise<Wallet[]> {
        const currentUser: User = await User.findOne({
            where: {id: userId},
            relations: ['wallets'],
            order: {
                wallets: {
                    initialBalance: "DESC"
                }
            }
        });
        return currentUser.wallets;
    }

    async updateWallet(walletDto: WalletDto, walletId: number): Promise<Wallet> {
        const walletEntity: Wallet = await Wallet.findOne({
            where: {id: walletId},
        })

        if (!walletEntity) {
            throw new Error('Wallet not found');
        }

        const {name, currency, initialBalance} = walletDto;

        walletEntity.name = name;
        walletEntity.currency = currency;
        walletEntity.initialBalance = initialBalance;

        await walletEntity.save();

        return walletEntity;
    }


    async deleteWalletById(walletId: number): Promise<any> {
        const wallet = await Wallet.findOne({
            where: {id: walletId},

        })
        await wallet.remove()
    }


}