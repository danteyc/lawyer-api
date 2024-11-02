import City from '../models/City.js';

export const getCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener las ciudades, ${error}` });
    }
};

export const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);

        if (!city) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }

        res.json(city);
    } catch (error) {
        res.status(500).json({ error: `Error al obtener la ciudad, ${error}` });
    }
};

export const createCity = async (req, res) => {
    try {
        const { name } = req.body;
        const newCity = await City.create({ name });
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: `Error al crear la ciudad, ${error}` });
    }
};

export const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }

        city.name = name;
        await city.save();

        res.json(city);
    } catch (error) {
        res.status(500).json({ error: `Error al actualizar la ciudad, ${error}` });
    }
};

export const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;

        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ message: 'Ciudad no encontrada' });
        }

        await city.destroy();
        res.json({ message: 'Ciudad eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: `Error al eliminar la ciudad, ${error}` });
    }
};
