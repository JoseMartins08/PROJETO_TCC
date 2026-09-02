const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const cadastrarUsuario = async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      perfil,
      curso,
      turma
    } = req.body;

    if (!nome || !email || !senha || !perfil || !curso || !turma) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    const perfisValidos = [
      'aluno',
      'organizador',
      'administrador'
    ];

    if (!perfisValidos.includes(perfil)) {
      return res.status(400).json({
        success: false,
        message: 'Perfil de usuário inválido'
      });
    }

    const [usuarioExistente] = await pool.execute(
      'SELECT id_usuario FROM usuario WHERE email = ?',
      [email]
    );

    if (usuarioExistente.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Este email já está cadastrado'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [resultado] = await pool.execute(
      `INSERT INTO usuario
      (nome, email, senha, perfil, curso, turma)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nome,
        email,
        senhaHash,
        perfil,
        curso,
        turma
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      usuario: {
        id_usuario: resultado.insertId,
        nome,
        email,
        perfil,
        curso,
        turma
      }
    });

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    const [usuarios] = await pool.execute(
      `SELECT
        id_usuario,
        nome,
        email,
        senha,
        perfil,
        curso,
        turma,
        ativo
      FROM usuario
      WHERE email = ?`,
      [email]
    );

    if (usuarios.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }

    const usuario = usuarios[0];

    if (!usuario.ativo) {
      return res.status(403).json({
        success: false,
        message: 'Usuário está inativo'
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET não configurado');

      return res.status(500).json({
        success: false,
        message: 'Configuração de autenticação ausente'
      });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        email: usuario.email,
        perfil: usuario.perfil
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h'
      }
    );

    return res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        curso: usuario.curso,
        turma: usuario.turma
      }
    });

  } catch (error) {
    console.error('Erro ao realizar login:', error);

    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

const usuarioLogado = async (req, res) => {
  try {
    const pool = require('../config/database');

    const [usuarios] = await pool.execute(
      `SELECT id_usuario, nome, email, perfil, curso, turma
       FROM usuario
       WHERE id_usuario = ? AND ativo = true`,
      [req.usuario.id_usuario]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      usuario: usuarios[0]
    });

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);

    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuário'
    });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  usuarioLogado
};