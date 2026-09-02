const express = require('express');
const cors = require('cors');
require('dotenv').config();

const testRoutes = require('./routes/testRoutes');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});