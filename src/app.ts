import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoute } from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoute);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    Message: 'hallo developer, Welcome to Ph-UV Api',
  });
};

app.get('/', getAController);

export default app;
