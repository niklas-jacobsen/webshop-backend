import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
  @ManyToOne(() => Order, (order) => order.orderitem)
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderitem)
  @JoinColumn({ name: "productId" })
  product!: Product;

  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @Column({
    type: "varchar",
    length: 10,
  })
  quantity: number;
}
