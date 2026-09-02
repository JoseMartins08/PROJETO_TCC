const express = require('express');
const { autenticarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/protected', autenticarToken, (req, res) => {
  res.json({
    success: true,
    message: 'Rota protegida funcionando',
    usuario: req.usuario
  });
});

module.exports = router;