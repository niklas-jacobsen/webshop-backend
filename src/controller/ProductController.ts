import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product);

  async add(req: Request, _res: Response) {
    return this.productRepository.save(req.body);
  }

  async remove(req: Request, _res: Response) {
    var product = await this.productRepository.findOneBy({ id: req.params.id });
    await this.productRepository.remove(product);
  }

  async getAll(req: Request, _res: Response) {
    return this.productRepository.find();
  }

  async getOne(req: Request, _res: Response) {
    return this.productRepository.findOne({ where: { id: req.params.id } });
  }
}
