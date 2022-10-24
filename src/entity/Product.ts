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

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: "text",
  })
  description: string;

  @Column()
  image_url: string;

  @Column()
  stock: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderitem!: OrderItem[];
}
