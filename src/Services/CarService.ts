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

  public async getAll() {
    const allCars = await this.model.find();
    return allCars.map((car) => this.createDomain(car));
  }

  public async getById(id: string) {
    const car = await this.model.findById({ _id: id });
    if (!car) throw new Error('Car not found');
    return this.createDomain(car);
  }
}

export default CarService;