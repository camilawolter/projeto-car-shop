import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import validateId from '../Middlewares/ValidateId';

const routes = Router();

routes.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

routes.get('/', async (req, res, next) => new MotorcycleController(req, res, next).getAll());

routes.get(
  '/:id', 
  validateId,
  async (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

routes.put(
  '/:id', 
  validateId,
  async (req, res, next) => new MotorcycleController(req, res, next).update(),
);

export default routes;