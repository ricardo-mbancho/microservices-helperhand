import express from 'express';

import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    service: 'auth-service',
    status: 'running',
  });
});

app.use('/auth', authRoutes);

export default app;
