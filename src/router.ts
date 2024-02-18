import express from 'express';
import bookRoutes from './routes/bookRoutes';
import authorRoutes from './routes/authorRoutes';

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);

export default router;