import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DataSource} from 'typeorm';
import {User} from "./entities/user.entity";
import {Wallet} from "./entities/wallet.entity";
import { WalletModule } from './wallets/wallet/wallet.module';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'moneylover',
            entities: [User, Wallet],
            synchronize: true,
            autoLoadEntities: true,
        }),
        WalletModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
