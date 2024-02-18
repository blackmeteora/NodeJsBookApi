import request from 'supertest';
import app, { appServer } from '../server';
import BookModel from '../models/book';
import connectDB, { disconnectDB } from '../database';
import AuthorModel from '../models/author';

describe('Book Controller', () => {
    beforeAll(async () => {
        connectDB();
    });

    afterEach(async () => {
        await BookModel.deleteMany({ title: { $regex: /^Test/ }});
        await AuthorModel.deleteMany({ name: { $regex: /^Test/ }});
    });

    afterAll(async () => {
        disconnectDB();
        appServer.close();
    });

    it('should get all books', async () => {
        const response = await request(app).get('/api/books/list');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should create a new book', async () => {
        const author = await AuthorModel.create({ name: "Test Author", country: "İzmir", birthDate :"10-03-1991" });
        const newBook = { title:"Test", author: author._id, price:10.0, isbn:"test", language:"Turkish", numberOfPages: 105, publisher : "Test Kitabevi" };
        const response = await request(app).post('/api/books/create').send(newBook);
        expect(response.status).toBe(201);
        delete response.body.author;
        delete newBook.author;
        expect(response.body).toMatchObject(newBook);
    });

    it('should update an existing book', async () => {
        const author = await AuthorModel.create({ name: "Test Author", country: "İzmir", birthDate :"10-03-1991" });
        const book = await BookModel.create({ title:"Test", author: author._id, price:10.0, isbn:"test", language:"Turkish", numberOfPages: 105, publisher : "Test Kitabevi" });
        const updatedBook = { title:"Test updated", author: author._id, price:10.0, isbn:"test", language:"Turkish", numberOfPages: 105, publisher : "Test Kitabevi" };
        const response = await request(app).put(`/api/books/update/${book._id}`).send(updatedBook);
        expect(response.status).toBe(200);
        delete response.body.author;
        delete updatedBook.author;
        expect(response.body).toMatchObject(updatedBook);
    });

    it('should delete an existing book', async () => {
        const author = await AuthorModel.create({ name: "Test Author", country: "İzmir", birthDate :"10-03-1991" });
        const book = await BookModel.create({ title:"Test", author: author._id, price:10.0, isbn:"test", language:"Turkish", numberOfPages: 105, publisher : "Test Kitabevi" });
        const response = await request(app).delete(`/api/books/delete/${book._id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toEqual(book._id.toString());
    });
});