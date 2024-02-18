import request from 'supertest';
import app, { appServer } from '../server';
import AuthorModel from '../models/author';
import connectDB, { disconnectDB } from '../database';

describe('Author Controller', () => {
    beforeAll(async () => {
        connectDB();
    });

    afterEach(async () => {
        await AuthorModel.deleteMany({ name: { $regex: /^Test/ }});
    });

    afterAll(async () => {
        disconnectDB();
        appServer.close();
    });

    it('should get all authors', async () => {
        const response = await request(app).get('/api/authors/list');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should create a new author', async () => {
        const newAuthor = { name: "Test Author", country: "İzmir", birthDate :"1991-10-02T22:00:00.000Z" };
        const response = await request(app).post('/api/authors/create').send(newAuthor);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newAuthor);
    });

    it('should update an existing author', async () => {
        const author = await AuthorModel.create({ name: "Test Author", country: "İzmir", birthDate :"1991-10-02T22:00:00.000Z" });
        const updatedAuthor = { name: "Test Author Updated", country: "İzmir", birthDate :"1991-10-02T22:00:00.000Z" };
        const response = await request(app).put(`/api/authors/update/${author._id}`).send(updatedAuthor);
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updatedAuthor);
    });

    it('should delete an existing author', async () => {
        const author = await AuthorModel.create({ name: "Test Author", country: "İzmir", birthDate :"1991-10-02T22:00:00.000Z" });
        const response = await request(app).delete(`/api/authors/delete/${author._id}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toEqual(author._id.toString());
    });
});