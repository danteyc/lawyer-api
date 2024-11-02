import express from 'express';
import {
    getCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
} from '../controllers/cityController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { isTokenRevoked } from '../middlewares/isTokenRevoked.js';

const router = express.Router();

router.get('/', getCities);

router.get('/:id', getCityById);

router.post('/', authenticate, isTokenRevoked, authorizeAdmin, createCity);

router.put('/:id', authenticate, isTokenRevoked, authorizeAdmin, updateCity);

router.delete('/:id', authenticate, isTokenRevoked, authorizeAdmin, deleteCity);

export default router;
