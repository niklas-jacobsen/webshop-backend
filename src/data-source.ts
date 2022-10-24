import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { OrderItem } from "./entity/OrderItem";
import { Order } from "./entity/Order";
import { Address } from "./entity/Address";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { Name } from "./entity/Name";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: undefined,
  database: "webshop",
  synchronize: true,
  logging: false,
  entities: [User, OrderItem, Order, Address, Product, Category, Name],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
