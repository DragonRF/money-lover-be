import {Injectable} from "@nestjs/common";
import {WalletDto} from "./wallet.dto";
import {Wallet} from "../../entities/wallet.entity";
import {User} from "../../entities/user.entity";

@Injectable()
export class WalletService{
    async createWallet(walletDto: WalletDto, userId) {
        let currentUser: User = await User.findOne({where: {id:userId}})
        const {name, currency, initialBalance} = walletDto;
        const walletEntity: Wallet = Wallet.create();
        walletEntity.name = name;
        walletEntity.currency = currency;
        walletEntity.initialBalance = initialBalance;
        walletEntity.user = currentUser
        await walletEntity.save()
        return walletEntity;
    }
}