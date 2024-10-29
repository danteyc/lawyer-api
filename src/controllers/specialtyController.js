import Specialty from '../models/Specialty.js';

// Crear una nueva especialidad
export const createSpecialty = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Crear la especialidad
        const specialty = await Specialty.create({ name });
        
        res.status(201).json({ message: 'Especialidad creada exitosamente', specialty });
    } catch (error) {
        res.status(500).json({ error: `Error al crear especialidad: ${error.message}` });
    }
};

// Obtener todas las especialidades
export const getAllSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.findAll();
        res.json({ specialties });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener especialidades' });
    }
};

// Obtener una especialidad por ID
export const getSpecialtyById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const specialty = await Specialty.findByPk(id);
        if (!specialty) return res.status(404).json({ message: 'Especialidad no encontrada' });
        
        res.json({ specialty });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener especialidad' });
    }
};

// Actualizar una especialidad
export const updateSpecialty = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        
        const specialty = await Specialty.findByPk(id);
        if (!specialty) return res.status(404).json({ message: 'Especialidad no encontrada' });
        
        await specialty.update({ name });
        res.json({ message: 'Especialidad actualizada exitosamente', specialty });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar especialidad' });
    }
};

// Eliminar una especialidad
export const deleteSpecialty = async (req, res) => {
    try {
        const { id } = req.params;
        
        const specialty = await Specialty.findByPk(id);
        if (!specialty) return res.status(404).json({ message: 'Especialidad no encontrada' });
        
        await specialty.destroy();
        res.json({ message: 'Especialidad eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar especialidad' });
    }
};
