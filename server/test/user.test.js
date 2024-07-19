import request from "supertest";
import app from "../index.js";
import { v4 as uuidv4 } from "uuid";
import userModel from "../models/UserModel.js";

let server;

beforeAll(async () => {
  server = app.listen(0);
});

afterAll(async () => {
  server.close();
});

describe("POST /api/v1/auth/register", () => {
  // Unique identifier prefix for test users
  const uniquePrefix = `test_${uuidv4()}`;

  afterEach(async () => {
    // Clean up the database after each test
    await userModel.deleteMany({ email: { $regex: `^${uniquePrefix}` } });
  });

  it("should return 400 if first_name is missing", async () => {
    const uniqueEmail = `${uniquePrefix}_${uuidv4()}@example.com`;
    const response = await request(server).post("/api/v1/auth/register").send({
      first_name: "",
      last_name: "Doe",
      email: uniqueEmail,
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("First Name is required");
  });

  it("should return 400 if last_name is missing", async () => {
    const uniqueEmail = `${uniquePrefix}_${uuidv4()}@example.com`;
    const response = await request(server).post("/api/v1/auth/register").send({
      first_name: "John",
      last_name: "",
      email: uniqueEmail,
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Last Name is required");
  });

  it("should return 400 if email is missing", async () => {
    const uniqueEmail = `${uniquePrefix}_${uuidv4()}@example.com`;
    const response = await request(server).post("/api/v1/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: "",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email is required");
  });

  it("should return 400 if password is missing", async () => {
    const uniqueEmail = `${uniquePrefix}_${uuidv4()}@example.com`;
    const response = await request(server).post("/api/v1/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: uniqueEmail,
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Password is required");
  });

  it("should return 200 if user already exists", async () => {
    const existingEmail = `${uniquePrefix}_${uuidv4()}@example.com`;
    await new userModel({
      first_name: "John",
      last_name: "Doe",
      email: existingEmail,
      password: "hashedpassword",
    }).save();

    const response = await request(server).post("/api/v1/auth/register").send({
      first_name: "John",
      last_name: "Doe",
      email: existingEmail,
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User already exists, Please Login");
  });

  it("should return 201 and register a new user", async () => {
    const uniqueEmail = `${uniquePrefix}_${uuidv4()}@example.com`;
    const response = await request(server).post("/api/v1/auth/register").send({
      first_name: "Jane",
      last_name: "Doe",
      email: uniqueEmail,
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfullly");
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user).toHaveProperty("first_name", "Jane");
    expect(response.body.user).toHaveProperty("last_name", "Doe");
    expect(response.body.user).toHaveProperty("email", uniqueEmail);
  });
});
