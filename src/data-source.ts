import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { OrderItem } from "./entity/OrderItem";
import { Order } from "./entity/Order";
import { Address } from "./entity/Address";
import { Product } from "./entity/Product";
import { Category } from "./entity/Category";
import { Name } from "./entity/Name";

dotenv.config();

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, OrderItem, Order, Address, Product, Category, Name],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
  ssl:
    process.env.ISLOCAL === "true"
      ? null
      : {
          rejectUnauthorized: true,
        },
});
