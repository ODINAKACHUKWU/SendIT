import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import app from "../../../server/index";
import userData from "../fixtures/userData";

chai.use(chaiHttp);

describe("Test for users API endpoints", () => {
  const tokens = [];
  beforeEach(async () => {
    const resOne = await chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        ...userData,
        email: "admin@test.com",
        category: "Admin"
      });

    const resTwo = await chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        ...userData,
        email: "regular@email.com",
        category: "Regular"
      });

    const resThree = await chai
      .request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@email.com",
        password: "john123"
      });
    tokens.push(JSON.parse(resOne.req.res.text).token);
    tokens.push(JSON.parse(resTwo.req.res.text).token);
    tokens.push(JSON.parse(resThree.req.res.text).token);
  });

  describe("GET /api/v1/users", () => {
    it("should return all users in the system for an admin", done => {
      chai
        .request(app)
        .get("/api/v1/users")
        .set("x-access-token", tokens[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal("success");
          expect(res.body.message).to.equal("Users retrieved");
          done();
        });
    });

    it("should not return users if no valid token is provided", done => {
      chai
        .request(app)
        .get("/api/v1/users")
        .set("content-type", "appication/json")
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal("failure");
          expect(res.body.message).to.equal("Token is not provided");
          done();
        });
    });

    it("should not return users if user is not an admin", done => {
      chai
        .request(app)
        .get("/api/v1/users")
        .set("x-access-token", tokens[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal("failure");
          expect(res.body.message).to.equal("User is not an admin");
          done();
        });
    });
  });

  describe("GET /api/v1/users/:id", () => {
    it("should return a user by id for an admin", done => {
      chai
        .request(app)
        .get("/api/v1/users/1")
        .set("x-access-token", tokens[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal("success");
          expect(res.body.message).to.equal("User retrieved");
          done();
        });
    });

    it("should not return a user if no valid token is provided", done => {
      chai
        .request(app)
        .get("/api/v1/users/1")
        .set("content-type", "appication/json")
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.status).to.equal("failure");
          expect(res.body.message).to.equal("Token is not provided");
          done();
        });
    });

    it("should not return the user if user is not an admin", done => {
      chai
        .request(app)
        .get("/api/v1/users/1")
        .set("x-access-token", tokens[1])
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.status).to.equal("failure");
          expect(res.body.message).to.equal(
            "User is not authorized to access this resource"
          );
          done();
        });
    });

    it("should not return the user if user is logged in", done => {
      chai
        .request(app)
        .get("/api/v1/users/1")
        .set("x-access-token", tokens[2])
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.status).to.equal("success");
          expect(res.body.message).to.equal("User retrieved");
          done();
        });
    });

    it("should not return not found if user doesn't exist", done => {
      chai
        .request(app)
        .get("/api/v1/users/0")
        .set("x-access-token", tokens[0])
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.status).to.equal("failure");
          expect(res.body.message).to.equal("User not found");
          done();
        });
    });
  });
});
