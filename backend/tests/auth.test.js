const request = require("supertest");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("../routes/authRoutes");

// Mock db query
jest.mock("../db/db", () => ({
  query: jest.fn(),
}));
const db = require("../db/db");

// Setup express app for testing
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

describe("Auth API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if register details missing", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 if login details missing", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 if refresh token is not provided", async () => {
    const res = await request(app).post("/api/auth/refresh");
    expect(res.statusCode).toEqual(401);
  });

  it("should return 401 on unauthorized protected route (getMe)", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.statusCode).toEqual(401);
  });
});
