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

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const allMoto = await motorcycleODM.find();
    return allMoto.map((moto) => this.createDomain(moto));
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const moto = await motorcycleODM.findById(id);
    if (!moto) throw new Error('Motorcycle not found');
    return this.createDomain(moto);
  }

  public async update(id: string, infos: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motoUpdate = await motorcycleODM.update(id, infos);
    const newMoto = await motorcycleODM.findById(id);
    if (newMoto !== null) return this.createDomain(newMoto);
    if (!motoUpdate) throw new Error('Motorcycle not found');
  }
}

export default MotorcycleService;