// server.js
import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import { pool } from './db/connection.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Teste de conexão com banco
app.get('/ping', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'Conectado ao banco!', hora: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao conectar com o banco' });
  }
});

app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
