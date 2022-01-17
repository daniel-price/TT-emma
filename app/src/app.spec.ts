import request from "supertest";
import app from "./app";

jest.mock("./db");

describe("/", () => {
  it("should respond with availability", async () => {
    const response = await request(app).get("/");
    const { statusCode, text } = response;
    expect(statusCode).toBe(200);
    expect(text).toBe("API available");
  });
});

describe("/rankings", () => {
  describe("should correctly validate input", () => {
    test.each([
      [{ fromDate: "2021-01-01", toDate: "2022-01-17" }, 400],
      [{ userId: "1", toDate: "2022-01-17" }, 400],
      [{ userId: "1", fromDate: "2022-01-01" }, 400],
      [{ userId: "1", fromDate: "2022-01-01", toDate: "not a date" }, 400],
      [{ userId: "1", fromDate: "2022-01-01", toDate: "2022-01-17" }, 200],
    ])("%s - code %i", async (params, expectedCode) => {
      const response = await request(app).get("/rankings").query(params);
      const { statusCode } = response;
      expect(statusCode).toBe(expectedCode);
    });
  });
});
