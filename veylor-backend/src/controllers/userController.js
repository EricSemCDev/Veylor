import db from '../models/index.js';
const { User } = db;

export const criarUsuario = async (req, res) => {
  try {
    const { email, senha, nomeCompleto, username, foto } = req.body;

    const novoUsuario = await User.create({ email, senha, nomeCompleto, username, foto });
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error(err);
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
