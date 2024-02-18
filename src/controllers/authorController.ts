import { Request, Response } from 'express';
import AuthorModel, { Author } from '../models/author';

export const getAllAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const authors = await AuthorModel.find().select("-__v");
        res.status(200).json(authors);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    const author: Author = req.body;
    try {
        const newAuthor = await AuthorModel.create(author);
        res.status(201).json(newAuthor);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const author: Author = req.body;
    try {
        const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, author, { new: true });
        if (!updatedAuthor) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }
        res.status(200).json(updatedAuthor);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedAuthor = await AuthorModel.findByIdAndDelete(id);
        if (!deletedAuthor) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }
        res.status(200).json(deletedAuthor);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};