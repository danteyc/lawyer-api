import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import lawyerRoutes from './src/routes/lawyerRoutes.js';
import specialtyRoutes from './src/routes/specialtyRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import cityRoutes from './src/routes/cityRoutes.js';
import models from './src/models/index.js'; 
import sequelize from './src/config/db.js';
import bcrypt from 'bcryptjs';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/lawyer', lawyerRoutes);
app.use('/specialty', specialtyRoutes);
app.use('/city', cityRoutes);
app.use('/upload', uploadRoutes);


async function initializeAdminUser() {
    try {
        // Verifica si existe un usuario administrador
        const adminUser = await models.User.findOne({ where: { role: 'admin' } });

        if (!adminUser) {
            // Crea un usuario administrador predeterminado si no existe
            const hashedPassword = await bcrypt.hash('admin123', 10);  // Cambia la contraseña predeterminada

            await models.User.create({
                firstName: 'Admin',
                lastName: 'User',
                city: 'Default City',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            });

            console.log('Usuario administrador creado con éxito');
        } else {
            console.log('Usuario administrador ya existe');
        }
    } catch (error) {
        console.error('Error al crear usuario administrador:', error);
    }
}

sequelize.sync({ alter: true }).then(async () => {
    await initializeAdminUser();
    app.listen(3000, () => console.log('Servidor en puerto 3000'));
}).catch(err => console.error('Error de conexión:', err));