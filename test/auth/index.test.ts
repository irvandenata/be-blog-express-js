import supertest from "supertest";
import server from "../../src/app";
import { User } from "../../src/models";
const baseUrl = `/api/${process.env.API_VERSION}`;

describe("POST /auth/login", () => {
    beforeAll(async () => {
        const user = await User.create({
            firstName: "test",
            lastName: "test",
            email: "test@mail.com",
            password: "password",
            passwordConfirm: "password",
            isVerified: true,
        });

        // console.log(user);
    });

    afterAll(async () => {
        await User.destroy({ where: { email: "test@mail.com" } });
    });

    it("fill email and password with correct data should return 200 OK", async () => {
        const response = await supertest(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: "test@mail.com",
                password: "password",
            });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
    });

    it("fill email and password with empty string should return 400 Bad Request", async () => {
        const response = await supertest(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: "",
                password: "",
            });
        expect(response.status).toBe(400);
        expect(response.body).toBeTruthy();
    });

    it("fill email correctly and password with empty string should return 400 Bad Request", async () => {
        const response = await supertest(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: "test@mail.com",
                password: "",
            });
        expect(response.status).toBe(400);
        expect(response.body).toBeTruthy();
    });

    it("fill email with empty string and password correctly should return 400 Bad Request", async () => {
        const response = await supertest(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: "",
                password: "test123",
            });
        expect(response.status).toBe(400);
        expect(response.body).toBeTruthy();
    });

    it("fill email and password with invalid data type should return 400 Bad Request", async () => {
        const response = await supertest(server)
            .post(`${baseUrl}/auth/login`)
            .send({
                email: 123,
                password: 123,
            });
        expect(response.status).toBe(400);
        expect(response.body).toBeTruthy();
    });
});

describe("POST /auth/register", () => {
    afterAll(async () => {
        await User.destroy({ where: { email: "test@mail.com" } });
    });

    it("fill all fields with correct data should return 200 OK", async () => {
        const response = await supertest(server)
            .post(`${baseUrl}/auth/register`)
            .send({
                firstName: "test",
                lastName: "test",
                email: "test@mail.com",
                password: "password",
                passwordConfirm: "password",
            });
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
    });
});

describe("POST /auth/forgot-password", () => {
    
});


// describe("GET /auth/logout", () => {
// });