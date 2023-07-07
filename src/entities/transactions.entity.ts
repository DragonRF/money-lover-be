import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne} from 'typeorm';
import {Wallet} from "./wallet.entity";
import {SubType} from "./sub_type.entity";

@Entity()
export class Transactions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note: string;

    @Column({type: "date"})
    date: string;

    @Column({default: 0})
    amount: number;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions )
    wallet: Wallet

    @ManyToOne(() => SubType, (subtype) => subtype.transactions)
    subtype: SubType
}
