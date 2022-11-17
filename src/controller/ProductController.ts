import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Product } from "../entity/Product";

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product);

  async add(req: Request, res: Response, next: NextFunction) {
    return this.productRepository.save(req.body);
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    var product = await this.productRepository.findOneBy({ id: req.params.id });
    await this.productRepository.remove(product);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    return this.productRepository.find();
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    return this.productRepository.findOne({ where: { id: req.params.id } });
  }
}
