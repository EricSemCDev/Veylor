// server.js
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import { pool } from './db/connection.js';
import userRoutes from './routes/userRoutes.js';
import rollRoutes from './routes/rollRoutes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors());
app.use(express.json());

app.use('/upload', express.static(path.resolve(__dirname, '../uploads')));
app.use('/user', userRoutes);
app.use('/roll', rollRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
