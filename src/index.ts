/* import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(5000);

    console.log(
      "Express server has started on port 5000. Open http://localhost:5000 to see results"
    );
  })
  .catch((error) => console.log(error)); */

import "reflect-metadata";
import * as express from "express";
import * as cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { AuthController } from "./controller/AuthController";
import { auth } from "./middleware/auth";

const authController = new AuthController();

const PORT = 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source initialized");

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.listen(PORT);

    const userRepository = AppDataSource.getRepository(User);

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

    app.post("/user", async (req: Request, res: Response) => {
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
          await authController.verifyPassword(req.body.password, user.password)
        ) {
          res.status(200).json({
            status: "success",
            message: "Successfully logged in",
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

    console.log(
      `Express server has started on port ${PORT}. Click here: http://localhost:${PORT}/`
    );
  })
  .catch((err) => {
    console.error("Initialization failed with Error", err);
  });
