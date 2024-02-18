import { Request, Response } from 'express';
import BookModel, { Book } from '../models/book';
import AuthorModel, { Author } from '../models/author';

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
        const books = await BookModel.find().populate("author", "-__v").select("-__v");;
        res.status(200).json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
    const book: Book = req.body;
    try {

        const newBook = await BookModel.create(book);

        res.status(201).json(newBook);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const book: Book = req.body;
    try {

        const updatedBook = await BookModel.findByIdAndUpdate(id, book, { new: true });
        
        if (!updatedBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json(updatedBook);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        res.status(200).json(deletedBook);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};