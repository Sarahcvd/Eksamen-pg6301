const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../server/apiRouter"));

describe("api router", () => {
  it("can return the users", async () => {
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          firstName: "Ole",
        });
      });
  });

  it("can create a new user", async () => {
    await request(app)
      .post("")
      .send({
        firstName: "Erna",
        lastName: "Solberg",
        email: "erna@solberg.no",
      })
      .expect(201);
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.map(({ firstName }) => firstName)).toContain(
          "Erna"
        );
      });
  });
});
