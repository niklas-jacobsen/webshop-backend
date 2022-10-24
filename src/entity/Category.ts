import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany(() => Product, (product) => product.category)
  product: Product;

  @Column()
  name: string;
}
