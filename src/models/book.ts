import mongoose, { Schema, Document } from 'mongoose';
import { Author } from './author';


export interface Book extends Document {
    title: string;
    author: mongoose.Types.ObjectId | Author;
    price: number;
    isbn: string;
    language: string;
    numberOfPages: number;
    publisher: string;
}

const BookSchema: Schema = new Schema<Book>({
    title: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "Author", required: true },
    price: { type: Number, required: true },
    isbn: { type: String, required: true },
    language: { type: String, required: true },
    numberOfPages: { type: Number, required: true },
    publisher: { type: String, required: true },
});

const BookModel = mongoose.model<Book>('Book', BookSchema);

export default BookModel;