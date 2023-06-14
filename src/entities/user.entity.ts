// user.entity.ts
import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BaseEntity, OneToMany} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Wallet} from "./wallet.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isActive: boolean;

    @Column({nullable: true})
    google_id: string;

    @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[]

}
