import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testes da camada Service', function () {
  it('Listagem de todos as motos com sucesso', async function () {
    const listMotorcycle = [
      {
        id: '63eab2da6f1f836f7e7386ab',
        model: 'Honda Cb 600f Big Trail',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '63eab3236f1f836f7e7386ad',
        model: 'Honda Cb 600f',
        year: 2014,
        color: 'Red',
        status: true,
        buyValue: 45.000,
        category: 'Street',
        engineCapacity: 600,
      },
    ];

    const domainMoto = [
      new Motorcycle(listMotorcycle[0]),
      new Motorcycle(listMotorcycle[1]),
    ];

    Sinon.stub(Model, 'find').resolves(listMotorcycle);

    const result = await new MotorcycleService().getAll();
    expect(result).to.be.deep.equal(domainMoto);
  });

  it('Listar somente uma moto pelo seu ID', async function () {
    const moto = {
      id: '63eab3236f1f836f7e7386ad',
      model: 'Honda Cb 600f',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const domainMoto = new Motorcycle(moto);

    Sinon.stub(Model, 'findById').resolves(domainMoto);

    const result = await new MotorcycleService().getById('63eab3236f1f836f7e7386ad');
    expect(result).to.be.deep.equal(domainMoto);
  });

  it('Adicionando uma nova moto a lista', async function () {
    const inputBody: IMotorcycle = {
      model: 'Honda',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const outputBody = {
      id: '63eab3236f1f836f7e7386ad',
      model: 'Honda',
      year: 2014,
      color: 'Black',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const domainMoto = new Motorcycle(outputBody);

    Sinon.stub(Model, 'create').resolves(outputBody);

    const result = await new MotorcycleService().create(inputBody);
    expect(result).to.be.deep.equal(domainMoto);
  });
  
  it('Alterar uma moto pelo id com id inexistente', async function () {
    const inputBody: IMotorcycle = {
      model: 'Honda',
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.000,
      category: 'Street',
      engineCapacity: 600,
    };
    
    Sinon.stub(Model, 'findOne').resolves(false);
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    try {
      const service = new MotorcycleService();
      await service.update('6348513f34c397abcad040b2', inputBody);
    } catch (err) {
      expect((err as Error).message).to.equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});