import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Testes da camada Service', function () {
  it('Listagem de todos os carros com sucesso', async function () {
    const listCars = [
      {
        id: '63eab2da6f1f836f7e7386ab',
        model: 'Marea',
        year: 2002,
        color: 'Red',
        status: true,
        buyValue: 25.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '63eab3236f1f836f7e7386ad',
        model: 'Fusca',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 3.99,
        doorsQty: 4,
        seatsQty: 5,
      },
    ];

    const domainCar = [
      new Car(listCars[0]),
      new Car(listCars[1]),
    ];

    Sinon.stub(Model, 'find').resolves(listCars);

    const result = await new CarService().getAll();
    expect(result).to.be.deep.equal(domainCar);
  });

  it('Listar somente um carro pelo seu ID', async function () {
    const car = {
      id: '63eab3236f1f836f7e7386ad',
      model: 'Fusca',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 3.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const domainCar = new Car(car);

    Sinon.stub(Model, 'findById').resolves(domainCar);

    const result = await new CarService().getById('63eab3236f1f836f7e7386ad');
    expect(result).to.be.deep.equal(domainCar);
  });

  it('Adicionando um novo carro a lista', async function () {
    const inputBody: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Green',
      status: true,
      buyValue: 25.999,
      doorsQty: 4,
      seatsQty: 5,
    };
    const outputBody = {
      id: '63eab2da6f1f836f7e7486ab',
      model: 'Marea',
      year: 2002,
      color: 'Green',
      status: true,
      buyValue: 25.999,
      doorsQty: 4,
      seatsQty: 5,
    };

    const domainCar = new Car(outputBody);

    Sinon.stub(Model, 'create').resolves(outputBody);

    const result = await new CarService().create(inputBody);
    expect(result).to.be.deep.equal(domainCar);
  });
  it('Alterar um carro pelo id com id inexistente', async function () {
    const inputBody: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Green',
      status: true,
      buyValue: 25.999,
      doorsQty: 4,
      seatsQty: 5,
    };
    
    Sinon.stub(Model, 'findOne').resolves(false);
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(false);

    try {
      const service = new CarService();
      await service.update('6348513f34c397abcad040b2', inputBody);
    } catch (err) {
      expect((err as Error).message).to.equal('Car not found');
    }
  });

  afterEach(function () {
    Sinon.restore();
  });
});