import Vehicle from './Vehicle';
import IMotorcycle from '../Interfaces/IMotorcycle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(infos: IMotorcycle) {
    super(infos);
    this.category = infos.category;
    this.engineCapacity = infos.engineCapacity;
  }
  public setCategory(category: string) {
    this.category = category;
  }

  public getCategory() {
    return this.category;
  }

  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}

export default Motorcycle;