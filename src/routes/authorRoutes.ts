import express from 'express';
import { getAllAuthors, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';

const router = express.Router();

router.get('/list', getAllAuthors);
router.post('/create', createAuthor);
router.put('/update/:id', updateAuthor);
router.delete('/delete/:id', deleteAuthor);

export default router;