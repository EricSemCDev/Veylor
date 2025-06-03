import express from 'express';
import upload from '../../config/multer.js';
import {
  criarUsuario,
  listarUsuarios,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario
} from '../controllers/userController.js';
import fs from 'fs';
import path from 'path';
import db from '../models/index.js';
import { autenticarToken } from '../middlewares/auth.js';

const { User } = db;
const router = express.Router();

// Upload direto para a pasta do usuário
router.post('/upload/perfil/:userId', upload.single('imagem'), async (req, res) => {
  const userId = req.params.userId;

  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  try {
    const usuario = await User.findByPk(userId);
    if (!usuario) {
      // Deleta o arquivo temporário se o usuário não existir
      await fs.promises.unlink(req.file.path);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const nomeArquivoFinal = 'fotoPerfil.jpg';
    const destinoDir = path.resolve(`uploads/perfil/user_${userId}`);
    const destino = path.join(destinoDir, nomeArquivoFinal);

    // Garante que a pasta existe (por segurança)
    await fs.promises.mkdir(destinoDir, { recursive: true });

    // Move e renomeia o arquivo
    await fs.promises.rename(req.file.path, destino);

    // Atualiza o campo "foto" do usuário no banco
    const url = `/upload/perfil/user_${userId}/${nomeArquivoFinal}`;
    await usuario.update({ foto: url });

    return res.status(200).json({ message: 'Imagem salva com sucesso', url });

  } catch (err) {
    console.error("Erro ao salvar imagem:", err);

    // Se der erro e o arquivo foi salvo, tenta limpar
    if (req.file?.path && fs.existsSync(req.file.path)) {
      await fs.promises.unlink(req.file.path).catch(() => {});
    }

    return res.status(500).json({ error: 'Erro ao salvar imagem' });
  }
});

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

// Deletar usuário por ID
router.post('/login', loginUsuario);

export default router;
