import express from 'express';
import { createLawyer, updateLawyer, deleteLawyer, listLawyers, searchLawyers } from '../controllers/lawyerController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { isTokenRevoked } from '../middlewares/isTokenRevoked.js';

const router = express.Router();

router.post('/create', authenticate, isTokenRevoked, authorizeAdmin, createLawyer);
router.put('/edit/:id', authenticate, isTokenRevoked, authorizeAdmin, updateLawyer);
router.delete('/delete/:id', authenticate, isTokenRevoked, authorizeAdmin, deleteLawyer);
router.get('/list', listLawyers);
router.get('/search', searchLawyers);


export default router;