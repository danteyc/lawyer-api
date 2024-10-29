import models from '../models/index.js'; 

export const isTokenRevoked = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const blacklistedToken = await models.TokenBlacklist.findOne({ where: { token } });

    if (blacklistedToken) {
        return res.status(403).json({ message: 'Token revocado, por favor inicie sesión nuevamente' });
    }

    next();
};
