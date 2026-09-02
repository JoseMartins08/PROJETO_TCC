const jwt = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Token de autenticação não fornecido'
      });
    }

    const partes = authHeader.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
      return res.status(401).json({
        success: false,
        message: 'Formato do token inválido'
      });
    }

    const token = partes[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = decoded;

    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};

module.exports = {
  autenticarToken
};