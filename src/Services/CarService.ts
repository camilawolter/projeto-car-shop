import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import Car from '../Domains/Car';

class CarService {
  private createDomain(infos: ICar) {
    return new Car(infos);
  }

  public async create(car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const carCreate = await carODM.create(car);
    return this.createDomain(carCreate);
  }

  public async getAll() {
    const carODM = new CarODM();
    const allCars = await carODM.find();
    return allCars.map((car) => this.createDomain(car));
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) throw new Error('Car not found');
    return this.createDomain(car);
  }

  public async update(id: string, infos: ICar) {
    const carODM = new CarODM();
    const carUpdate = await carODM.update(id, infos);
    const newCar = await carODM.findById(id);
    if (newCar !== null) return this.createDomain(newCar);
    if (!carUpdate) throw new Error('Car not found');
  }
}

export default CarService;