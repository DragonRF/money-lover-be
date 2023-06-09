// wallet.entity.ts
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne, OneToMany} from 'typeorm';
import {User} from "./user.entity";
import {Transactions} from "./transactions.entity";

@Entity()
export class Wallet extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    currency: string;

    @Column({default: 0})
    initialBalance: number;

    @ManyToOne(() => User, (user) => user.wallets )
    user: User

    @OneToMany(() => Transactions, (transaction) => transaction.wallet)
    transactions: Transactions[]
}
