// models/index.js
import sequelize from '../config/db.js';
import User from './User.js';
import City from './City.js';
import Specialty from './Specialty.js';
import Lawyer from './Lawyer.js';
import TokenBlacklist from './TokenBlacklist.js';

// Agrega todos los modelos al objeto `models`
const models = { User, City, Specialty, Lawyer, TokenBlacklist };

// Configura las asociaciones entre los modelos
City.associate = (models) => {
    City.hasMany(models.Lawyer, { foreignKey: 'cityId' });
};
Specialty.associate = (models) => {
    Specialty.hasMany(models.Lawyer, { foreignKey: 'specialtyId' });
};
Lawyer.associate = (models) => {
    Lawyer.belongsTo(models.City, { foreignKey: 'cityId' });
    Lawyer.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
};

// Ejecuta las asociaciones
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { sequelize };
export default models;
