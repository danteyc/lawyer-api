import City from '../models/City.js';
import Lawyer from '../models/Lawyer.js';
import Specialty from '../models/Specialty.js';

export const createLawyer = async (req, res) => {
  try {
      const { cityId, specialtyId, ...otherData } = req.body;

      // Verifica que la ciudad y la especialidad existen
      const city = await City.findByPk(cityId);
      const specialty = await Specialty.findByPk(specialtyId);

      if (!city) {
          return res.status(404).json({ error: 'La ciudad especificada no existe' });
      }
      if (!specialty) {
          return res.status(404).json({ error: 'La especialidad especificada no existe' });
      }

      // Crea el abogado si las validaciones pasaron
      const lawyer = await Lawyer.create({ cityId, specialtyId, ...otherData });
      res.status(201).json({ message: 'Abogado creado exitosamente', lawyer });
  } catch (error) {
      res.status(500).json({ error: `Error al crear abogado, ${error}` });
  }
};

export const updateLawyer = async (req, res) => {
  try {
      const { id } = req.params;
      const { cityId, specialtyId, ...otherData } = req.body;

      const lawyer = await Lawyer.findByPk(id);
      if (!lawyer) {
          return res.status(404).json({ message: 'Abogado no encontrado' });
      }

      // Verifica que la ciudad y la especialidad existen, si están presentes en la actualización
      if (cityId) {
          const city = await City.findByPk(cityId);
          if (!city) {
              return res.status(404).json({ error: 'La ciudad especificada no existe' });
          }
      }
      if (specialtyId) {
          const specialty = await Specialty.findByPk(specialtyId);
          if (!specialty) {
              return res.status(404).json({ error: 'La especialidad especificada no existe' });
          }
      }

      // Actualiza el abogado si las validaciones pasaron
      await lawyer.update({ cityId, specialtyId, ...otherData });
      res.json({ message: 'Abogado actualizado exitosamente', lawyer });
  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar abogado' });
  }
};

export const deleteLawyer = async (req, res) => {
  try {
      const { id } = req.params;
      const lawyer = await Lawyer.findByPk(id);

      if (!lawyer) return res.status(404).json({ message: 'Abogado no encontrado' });

      await lawyer.destroy();
      res.json({ message: 'Abogado eliminado exitosamente' });
  } catch (error) {
      res.status(500).json({ error: 'Error al eliminar abogado' });
  }
};

// Listar abogados con paginación
export const listLawyers = async (req, res) => {
  try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const lawyers = await Lawyer.findAndCountAll({
          include: [City, Specialty],  // Incluye la ciudad y especialidad en los resultados
          limit: parseInt(limit),
          offset: parseInt(offset)
      });

      res.json({
          total: lawyers.count,
          totalPages: Math.ceil(lawyers.count / limit),
          currentPage: parseInt(page),
          lawyers: lawyers.rows
      });
  } catch (error) {
      res.status(500).json({ error: 'Error al listar abogados' });
  }
};

// Buscar abogados por nombre, ciudad o especialidad
export const searchLawyers = async (req, res) => {
  try {
      const { name, cityId, specialtyId } = req.query;

      // Construye la cláusula `where` en función de los filtros presentes
      const whereClause = {};
      if (name) whereClause.firstName = { $like: `%${name}%` };
      if (cityId) whereClause.cityId = cityId;
      if (specialtyId) whereClause.specialtyId = specialtyId;

      const lawyers = await Lawyer.findAll({
          where: whereClause,
          include: [City, Specialty]  // Incluye ciudad y especialidad para facilitar la búsqueda
      });

      res.json({ lawyers });
  } catch (error) {
      res.status(500).json({ error: 'Error al buscar abogados' });
  }
};

export const getLawyerDetail = async (req, res) => {
    try {
        const { id } = req.params;
  
        const lawyer = await Lawyer.findByPk(id, {
            include: [City, Specialty]
        });
  
        if (!lawyer) {
            return res.status(404).json({ message: 'Abogado no encontrado' });
        }
  
        res.json({ lawyer });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener detalle del abogado' });
    }
  };