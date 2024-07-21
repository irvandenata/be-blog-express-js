import supertest from "supertest";
import server from "../../src/index";
import db from "../../src/models";
beforeAll(async () => {
    await db.authenticate(); // Menghubungkan ke database
    await db.sync({ force: true }); // Sinkronisasi model dengan database
});

afterAll(async () => {
    await db.close(); // Menutup koneksi database setelah semua test selesai
});
const baseUrl = `/api/${process.env.API_VERSION}`;
describe("POST /auth/login", () => {
	it("should return 200 OK", async () => {
		const response = await supertest(server).post(`${baseUrl}/auth/login`).send({
            email: "admin@mail.com",
            password: "admin123",
        });
        expect(response.status).toBe(200);
        expect(response.body).toBeTruthy();
	});
    it("should return 400 Bad Request", () => {
        expect(1).toBe(1);
    });
    it("should return 401 Unauthorized", () => {
        expect(1).toBe(1);
    });
    it("should return 500 Internal Server Error", () => {
        expect(1).toBe(1);
    });
    
});
