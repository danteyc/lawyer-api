import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import TokenBlacklist from '../models/TokenBlacklist.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { firstName, lastName, city, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            city,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        res.status(500).json({ error: 'Error en el registro' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: `Error al iniciar sesión, ${error}` });
    }
};


export const logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    // Verificar y obtener la fecha de expiración del token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        // Guardar el token en la blacklist con su fecha de expiración
        const expiresAt = new Date(decoded.exp * 1000); // Convertir de segundos a milisegundos
        await TokenBlacklist.create({ token, expiresAt });

        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
};