import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SubType } from './sub_type.entity';

@Entity()
export class TypeTransaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubType, (subtype) => subtype.typeTransaction)
  subtype: SubType[];
}
