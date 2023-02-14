import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import Motorcycle from '../Domains/Motorcycle';

class MotorcycleService {
  private createDomain(infos: IMotorcycle) {
    return new Motorcycle(infos);
  }

  public async create(moto: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const motoCreate = await motorcycleODM.create(moto);
    return this.createDomain(motoCreate);
  }
}

export default MotorcycleService;