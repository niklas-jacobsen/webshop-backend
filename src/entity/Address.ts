import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Name } from "./Name";
import { Order } from "./Order";
import { User } from "./User";

@Entity()
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Order, (order) => order.address)
  order: Order;

  @Column(() => Name)
  name: Name;

  @Column({
    type: "varchar",
    length: 100,
  })
  street: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  number: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  city: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  zipcode: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
    default: null,
  })
  extra: string;
}
