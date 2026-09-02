const pool = require('../config/database');

const healthCheck = async (req, res) => {
  try {
    // Testar conexão com MySQL
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();

    res.json({
      success: true,
      message: 'API QuadraSync funcionando',
      database: 'connected'
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      message: 'API QuadraSync com problemas',
      database: 'disconnected',
      error: err.code
    });
  }
};

module.exports = { healthCheck };