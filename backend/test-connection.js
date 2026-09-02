require('dotenv').config();
const pool = require('./src/config/database');

// Aguarda um pouco para o pool tentar conectar
setTimeout(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('\n✅ Teste de conexão bem-sucedido!');

    // Testar query simples
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query de teste executada:', rows);

    // Verificar tabelas existentes
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📋 Tabelas no banco db_QuadraSync:');
    if (tables.length === 0) {
      console.log('   (nenhuma tabela encontrada)');
    } else {
      tables.forEach(t => console.log(`   - ${Object.values(t)[0]}`));
    }

    connection.release();
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Falha no teste de conexão:', err.message);
    await pool.end();
    process.exit(1);
  }
}, 1000);