import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.json({
    service: 'booking-service',
    status: 'running',
  });
});

export default app;
