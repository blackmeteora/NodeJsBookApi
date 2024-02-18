// src/models/author.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface Author extends Document {
    name: string;
    country: string;
    birthDate: Date;
}

export const AuthorSchema: Schema = new Schema<Author>({
    name: { type: String, required: true },
    country: { type: String, required: true },
    birthDate: { type: Date, required: true },
});

const AuthorModel = mongoose.model<Author>('Author', AuthorSchema);

export default AuthorModel;