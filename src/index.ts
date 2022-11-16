import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { AuthController } from "./controller/AuthController";
import { auth } from "./middleware/auth";

const PORT = 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source initialized");

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.listen(PORT);

    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const authController = new AuthController();

    app.get("/users", async (_req: Request, res: Response) => {
      try {
        res.send(await userRepository.find());
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.get("/user/me", [auth], async (req: Request, res: Response) => {
      try {
        res.send(
          await userRepository.findOne({ where: { id: res.locals.userId } })
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.get("/user/:id", [auth], async (req: Request, res: Response) => {
      try {
        res.send(
          await userRepository.findOne({ where: { id: req.params.id } })
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.post("/register", async (req: Request, res: Response) => {
      try {
        const user = await userRepository.save({
          email: req.body.email,
          password: await authController.hashPassword(req.body.password),
          name: {
            first: req.body.firstName,
            last: req.body.lastName,
          },
        });

        res.send(user);

        console.info(`User ${user.name.first} ${user.name.last} added`);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.post("/login", async (req: Request, res: Response) => {
      try {
        const user = await userRepository.findOne({
          where: {
            email: req.body.email,
          },
        });

        if (
          await authController.verifyPassword(req.body.password, user.password) //if password correct
        ) {
          res.status(200).json({
            status: "success",
            message: "Login successful",
            token: authController.generateJWT(user.id),
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "Login failed",
          });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.get("/logout", async (req: Request, res: Response) => {
      try {
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.post("/product", async (req: Request, res: Response) => {
      try {
        const product = await productRepository.save({
          category: req.body.category,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          image_url: req.body.image_url,
          stock: req.body.stock,
        });

        res.send(product);

        console.info(`Product ${product.name} added to inventory`);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.get("/products", async (_req: Request, res: Response) => {
      try {
        res.send(await productRepository.find());
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    app.get("/products/:id", async (req: Request, res: Response) => {
      try {
        res.send(
          await productRepository.findOne({ where: { id: req.params.id } })
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          status: "error",
          message: err.message,
        });
      }
    });

    console.log(
      `Express server has started on port ${PORT}. Click here: http://localhost:${PORT}/`
    );
  })
  .catch((err) => {
    console.error("Initialization failed with Error", err);
  });
