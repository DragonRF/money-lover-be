import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, ManyToOne, OneToMany} from 'typeorm';
import {User} from "./user.entity";
import {Transactions} from "./transactions.entity";
import {TypeTransaction} from "./type_transaction.entity";

@Entity()
export class SubType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Transactions, (transaction) => transaction.subtype)
    transactions: Transactions[]

    @ManyToOne(() => TypeTransaction, (typeTransaction) => typeTransaction.subtype)
    typeTransaction: TypeTransaction
}
