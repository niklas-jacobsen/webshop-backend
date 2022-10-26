import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @Column({
    type: "varchar",
    length: 200,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 10,
  })
  price: number;

  @Column({
    type: "varchar",
    length: 2000,
  })
  description: string;

  @Column({
    type: "varchar",
  })
  image_url: string;

  @Column({
    type: "varchar",
    width: 10,
  })
  stock: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderitem!: OrderItem[];
}
