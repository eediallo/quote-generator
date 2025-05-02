import { vi, expect, describe, beforeEach, afterEach, it } from "vitest";
import request from "supertest";

import { User } from "../../models/user";
import { StatusCodes } from "http-status-codes";
import app from "../../server";

describe("register()", () => {
  let createMock;

  beforeEach(() => {
    createMock = vi.spyOn(User, "create");
  });

  afterEach(() => {
    createMock.mockRestore();
  });

  it(`should register a user with ${StatusCodes.CREATED} status`, async () => {
    const user = {
      name: "Daniel",
      email: "daniel@gmail.com",
      password: "Secret98",
    };

    const token = "mocked-jwt-token";
    createMock.mockResolvedValue({
      ...user,
      createJWT: vi.fn().mockResolvedValue(token),
    });

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(user);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("name", user.name);
    expect(response.body).toHaveProperty("token", token);
  });

it("should return a 400 status if required fields are missing", async () => {
    const user = {
        email: "daniel@gmail.com",
    };

    const response = await request(app)
        .post("/api/v1/auth/register")
        .send(user);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("msg", "Please provide all required fields.");
});

  it(`should handle ${StatusCodes.INTERNAL_SERVER_ERROR} errors during user creation`, async () => {
    createMock.mockRejectedValue(new Error("Database error"));

    const user = {
      name: "Daniel",
      email: "daniel@gmail.com",
      password: "Secret98",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(user);

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty(
      "msg",
      "Something went wrong, please try again later"
    );
  });
});
