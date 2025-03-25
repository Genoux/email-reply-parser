import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhook';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', ( _, res) => {
  res.status(200).json({ status: 'OK', message: 'Email webhook service is running' });
});

app.use('/webhook', webhookRoutes);

app.listen(PORT, () => {
  console.log(`Email webhook server running on port ${PORT}`);
});