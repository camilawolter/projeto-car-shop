import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (err) {
      this.next(err);
    }
  }

  public async getAll() {
    try {
      const allMoto = await this.service.getAll();
      return this.res.status(200).json(allMoto);
    } catch (err) {
      this.next(err);
    }
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const moto = await this.service.getById(id);
      return this.res.status(200).json(moto);
    } catch (err) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
  }

  public async update() {
    try {
      const { id } = this.req.params;
      const motoInfos: IMotorcycle = {
        model: this.req.body.model,
        year: this.req.body.year,
        color: this.req.body.color,
        status: this.req.body.status,
        buyValue: this.req.body.buyValue,
        category: this.req.body.category,
        engineCapacity: this.req.body.engineCapacity,
      };
      const motoUpdate = await this.service.update(id, motoInfos);
      return this.res.status(200).json(motoUpdate);
    } catch (err) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
  }
}

export default MotorcycleController;