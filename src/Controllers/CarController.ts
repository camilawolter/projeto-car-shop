import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (err) {
      this.next(err);
    }
  }

  public async getAll() {
    try {
      const allCars = await this.service.getAll();
      return this.res.status(200).json(allCars);
    } catch (err) {
      this.next(err);
    }
  }

  public async getById() {
    try {
      const { id } = this.req.params;
      const car = await this.service.getById(id);
      return this.res.status(200).json(car);
    } catch (err) {
      return this.res.status(404).json({ message: 'Car not found' });
    }
  }
}

export default CarController;
