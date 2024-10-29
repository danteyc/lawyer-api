import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Specialty = sequelize.define('Specialty', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false }
});

Specialty.associate = models => {
    Specialty.hasMany(models.Lawyer, { foreignKey: 'specialtyId' });
};

export default Specialty;