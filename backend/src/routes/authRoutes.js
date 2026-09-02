const express = require('express');

const {
  cadastrarUsuario,
  loginUsuario,
  usuarioLogado
} = require('../controllers/authController');

const { autenticarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Cadastro
router.post('/register', cadastrarUsuario);

// Login
router.post('/login', loginUsuario);

// Usuário autenticado
router.get('/me', autenticarToken, usuarioLogado);

module.exports = router;