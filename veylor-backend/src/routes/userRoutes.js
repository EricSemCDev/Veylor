import express from 'express';
import {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../controllers/userController.js';

const router = express.Router();

// Criar novo usuário
router.post('/', criarUsuario);

// Listar todos os usuários
router.get('/', listarUsuarios);

// Buscar usuário por ID
router.get('/:id', buscarUsuario);

// Atualizar usuário por ID
router.put('/:id', atualizarUsuario);

// Deletar usuário por ID
router.delete('/:id', deletarUsuario);

export default router;
