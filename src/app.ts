import express from 'express';
import CarRoutes from './Routes/CarRoutes';
import MotorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());
app.use('/cars', CarRoutes);
app.use('/motorcycles', MotorcycleRoutes);

export default app;
