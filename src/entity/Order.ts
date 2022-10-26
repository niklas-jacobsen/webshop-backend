import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Address } from "./Address";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  RECEIVED = "received",
  PAID = "paid",
  CANCELED = "canceled",
  PROCESSED = "processed",
  SHIPPED = "shipped",
  COMPLETED = "completed",
  RETURNED = "returned",
  REFUNDED = "refunded",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(() => Address, (address) => address.order)
  address: Address;

  @CreateDateColumn({
    type: "date",
  })
  creation_date: Date;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.RECEIVED,
  })
  status: string;

  @OneToMany(() => OrderItem, (orderitem) => orderitem.order)
  orderitem!: OrderItem[];
}
