import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./Order";
import { Name } from "./Name";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column(() => Name)
  name: Name;

  @Column({
    type: "varchar",
    length: 200,
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 2000,
  })
  password: string;

  @OneToMany(() => Order, (order) => order.user)
  order: Order;
}
