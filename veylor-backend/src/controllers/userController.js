import db from '../models/index.js';
const { User } = db;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const criarUsuario = async (req, res) => {
  try {
    const { email, senha, nomeCompleto, username } = req.body;

    const existente = await User.findOne({ where: { email } });
    if (existente) return res.status(409).json({ erro: 'E-mail já está em uso' });

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await User.create({
      email,
      senha: senhaHash,
      nomeCompleto,
      username,
      foto: null // ou algum valor padrão
    });

    res.status(201).json(novoUsuario); // Aqui retorna o ID!
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuário' });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    await usuario.update(req.body);
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar usuário' });
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

    await usuario.destroy();
    res.json({ mensagem: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar usuário' });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha inválidos.' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // payload
      process.env.JWT_SECRET,                   // chave secreta
      { expiresIn: process.env.JWT_EXPIRES_IN } // expiração
    );

    res.status(200).json({
      mensagem: 'Login bem-sucedido!',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nomeCompleto: usuario.nomeCompleto,
        username: usuario.username,
        foto: usuario.foto
      }
    });

  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
};