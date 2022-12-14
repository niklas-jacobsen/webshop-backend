import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(req: Request, _res: Response) {
    return this.userRepository.find();
  }

  async getOne(req: Request, _res: Response) {
    return this.userRepository.findOne({ where: { id: req.params.id } });
  }

  async add(req: Request, _res: Response) {
    return this.userRepository.save(req.body);
  }

  async remove(req: Request, _res: Response) {
    let userToRemove = await this.userRepository.findOneBy({
      id: req.params.id,
    });
    await this.userRepository.remove(userToRemove);
  }
}
