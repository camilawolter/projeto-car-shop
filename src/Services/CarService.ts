import { Model } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

class CarService {
  private model: Model<ICar>;

  constructor() {
    this.model = new CarODM().model;
  }

  private createDomain(infos: ICar) {
    return new Car(infos);
  }

  public async create(car: ICar | null): Promise<Car | null> {
    const carCreate = await this.model.create(car);
    return this.createDomain(carCreate);
  }
}

export default CarService;