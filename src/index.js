import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', imageRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend de gestión de imágenes funcionando' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});