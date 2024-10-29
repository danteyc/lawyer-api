import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Lawyer = sequelize.define('Lawyer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    cityId: { type: DataTypes.INTEGER, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    dni: { type: DataTypes.STRING, allowNull: false },
    specialtyId: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true }
});

Lawyer.associate = models => {
    Lawyer.belongsTo(models.City, { foreignKey: 'cityId' });
    Lawyer.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
};

export default Lawyer;
