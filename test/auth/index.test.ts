import supertest from "supertest";
import server from "../../src/app";
const baseUrl = `/api/${process.env.API_VERSION}`;
describe("POST /auth/login", () => {
	it("fill email and password with correct data should return 200 OK", async () => {
		const response = await supertest(server)
			.post(`${baseUrl}/auth/login`)
			.send({
				email: "admin@mail.com",
				password: "admin123",
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
				email: "admin@mail.com",
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
				password: "admin123",
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
