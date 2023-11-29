import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    Message: 'hallo developer, Welcome to Ph-UV Api',
  });
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
