import express from 'express';
import { index, get, indexLessons } from '../controllers/user';
import { checkAuthenticated } from '../jwt';
const router = express.Router();

router.get('/', checkAuthenticated, index);
router.get('/:id', checkAuthenticated, get);
router.get('/:userId/lessons', checkAuthenticated, indexLessons);

export default router;