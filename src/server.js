import app from './app.js';
import sequelize from './config/connection.js';

import './models/associations.js'; 

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        
        await sequelize.sync({ alter: true });
        console.log('✅ Todas as tabelas foram sincronizadas no Neon!');
        
        app.listen(PORT, () => {
            console.log(`Server running on localhost:\\${PORT}`);
        });
    } catch (err) {
        console.error('❌ Erro ao sincronizar banco:', err);
    }
}

startServer();