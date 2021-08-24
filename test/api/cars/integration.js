const chaiHttp = require("chai-http");
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

const request = require("supertest");
const config = require("../../../config");
const app = require("../../../server.js");
const db = require("../../../db/db.js");

describe("Integration test", () => {
  before((done) => {
    db.connectMongodb()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe("Test get car details and list", () => {
    it("Creating a new admin user using POST /api/user/register works.", function (done) {
      chai
        .request(app)
        .post("/api/user/register")
        .send({
          username: config.UNITTEST_USER_NAME,
          email: config.UNITTEST_USER_EMAIL,
          password: config.UNITTEST_USER_PASSWORD,
        })
        .end(function (err, res) {
          console.log("Register");
          console.log(res.body);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property("email");
          res.body.email.should.equal(config.UNITTEST_USER_EMAIL);
          done();
        });
    });

    it("Login using the admin user using POST /api/user/login works.", (done) => {
      var user = request(app)
        .post("/api/user/login")
        .send({
          email: config.UNITTEST_USER_EMAIL,
          password: config.UNITTEST_USER_PASSWORD,
        })
        .then((res) => {
          console.log("Login");
          console.log(res.body);
          res.body.should.have.property("idToken");
          res.body.should.have.property("expiresIn");
          res.body.expiresIn.should.not.equal("");
          res.body.expiresIn.should.equal(config.JWT_TOKEN_EXPIRY);
          done();
        })
        .catch((err) => done(err));
    });

    const name_01 = config.UNITTEST_NAME_01;
    const mpg_01 = config.UNITTEST_MPG_01;
    const cyl_01 = config.UNITTEST_CYL_01;
    const disp_01 = config.UNITTEST_DISP_01;
    const hp_01 = config.UNITTEST_HP_01;
    const wt_01 = config.UNITTEST_WT_01;
    const acc_01 = config.UNITTEST_ACC_01;
    const yr_01 = config.UNITTEST_YR_01;
    const org_01 = config.UNITTEST_ORG_01;

    const name_02 = config.UNITTEST_NAME_02;
    const mpg_02 = config.UNITTEST_MPG_02;
    const cyl_02 = config.UNITTEST_CYL_02;
    const disp_02 = config.UNITTEST_DISP_02;
    const hp_02 = config.UNITTEST_HP_02;
    const wt_02 = config.UNITTEST_WT_02;
    const acc_02 = config.UNITTEST_ACC_02;
    const yr_02 = config.UNITTEST_YR_02;
    const org_02 = config.UNITTEST_ORG_02;

    var car_id_01 = null;
    var car_id_02 = null;

    it("Creating a new Car using POST /api/car/create works.", (done) => {
      request(app)
        .post("/api/car/create")
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send({
          name: name_01,
          mpg: mpg_01,
          cylinders: cyl_01,
          displacement: disp_01,
          horsepower: hp_01,
          weight: wt_01,
          acceleration: acc_01,
          year: yr_01,
          origin: org_01,
        })
        .then((res) => {
          console.log("Car #1");
          console.log(res.body);
          const body = res.body;
          res.body.should.have.property("name").to.be.equal(name_01);
          res.body.should.have.property("mpg").to.be.equal(mpg_01);
          res.body.should.have.property("cylinders").to.be.equal(cyl_01);
          res.body.should.have.property("displacement").to.be.equal(disp_01);
          res.body.should.have.property("horsepower").to.be.equal(hp_01);
          res.body.should.have.property("weight").to.be.equal(wt_01);
          res.body.should.have.property("acceleration").to.be.equal(acc_01);
          res.body.should.have.property("origin").to.be.equal(org_01);
          done();
        })
        .catch((err) => done(err));
    });

    it("Fetching Car details using GET /api/car/:name works.", (done) => {
      request(app)
        .get("/api/car/" + name_01)
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send()
        .then((res) => {
          const body = res.body;
          res.body.should.have.property("name").to.be.equal(name_01);
          res.body.should.have.property("mpg").to.be.equal(mpg_01);
          res.body.should.have.property("cylinders").to.be.equal(cyl_01);
          res.body.should.have.property("displacement").to.be.equal(disp_01);
          res.body.should.have.property("horsepower").to.be.equal(hp_01);
          res.body.should.have.property("weight").to.be.equal(wt_01);
          res.body.should.have.property("acceleration").to.be.equal(acc_01);
          res.body.should.have.property("origin").to.be.equal(org_01);
          car_id_01 = body._id;
          done();
        })
        .catch((err) => done(err));
    });

    it("Fetching Car details using GET /api/car/:name does not work without JWT Token. Expected to return 403 status code (Forbidden)", function (done) {
      request(app)
        .get("/api/car/" + name_01)
        .send()
        .end(function (err, res) {
          res.should.have.status(403);
          done();
        });
    });

    it("Creating one more Car using POST /api/car/create works.", (done) => {
      request(app)
        .post("/api/car/create")
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send({
          name: name_02,
          mpg: mpg_02,
          cylinders: cyl_02,
          displacement: disp_02,
          horsepower: hp_02,
          weight: wt_02,
          acceleration: acc_02,
          year: yr_02,
          origin: org_02,
        })
        .then((res) => {
          console.log("Car #2");
          console.log(res.body);
          const body = res.body;
          res.body.should.have.property("name").to.be.equal(name_02);
          res.body.should.have.property("mpg").to.be.equal(mpg_02);
          res.body.should.have.property("cylinders").to.be.equal(cyl_02);
          res.body.should.have.property("displacement").to.be.equal(disp_02);
          res.body.should.have.property("horsepower").to.be.equal(hp_02);
          res.body.should.have.property("weight").to.be.equal(wt_02);
          res.body.should.have.property("acceleration").to.be.equal(acc_02);
          res.body.should.have.property("origin").to.be.equal(org_02);
          done();
        })
        .catch((err) => done(err));
    });

    it("Fetching Car details #2 using GET /api/car/:name works.", (done) => {
      request(app)
        .get("/api/car/" + name_02)
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send()
        .then((res) => {
          const body = res.body;
          res.body.should.have.property("name").to.be.equal(name_02);
          res.body.should.have.property("mpg").to.be.equal(mpg_02);
          res.body.should.have.property("cylinders").to.be.equal(cyl_02);
          res.body.should.have.property("displacement").to.be.equal(disp_02);
          res.body.should.have.property("horsepower").to.be.equal(hp_02);
          res.body.should.have.property("weight").to.be.equal(wt_02);
          res.body.should.have.property("acceleration").to.be.equal(acc_02);
          res.body.should.have.property("origin").to.be.equal(org_02);
          car_id_02 = body._id;
          done();
        })
        .catch((err) => done(err));
    });

    it("Getting the Car list using GET /api/cars works", (done) => {
      request(app)
        .get("/api/cars")
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send()
        .then((res) => {
          res.should.have.status(200);
          var body = res.body[1];
          body.should.have.property("name").to.be.equal(name_02);
          body.should.have.property("mpg").to.be.equal(mpg_02);
          body.should.have.property("cylinders").to.be.equal(cyl_02);
          body.should.have.property("displacement").to.be.equal(disp_02);
          body.should.have.property("horsepower").to.be.equal(hp_02);
          body.should.have.property("weight").to.be.equal(wt_02);
          body.should.have.property("acceleration").to.be.equal(acc_02);
          body.should.have.property("origin").to.be.equal(org_02);
          body.should.have.property("_id").to.be.equal(car_id_02);
          body = res.body[0];
          body.should.have.property("name").to.be.equal(name_01);
          body.should.have.property("mpg").to.be.equal(mpg_01);
          body.should.have.property("cylinders").to.be.equal(cyl_01);
          body.should.have.property("displacement").to.be.equal(disp_01);
          body.should.have.property("horsepower").to.be.equal(hp_01);
          body.should.have.property("weight").to.be.equal(wt_01);
          body.should.have.property("acceleration").to.be.equal(acc_01);
          body.should.have.property("origin").to.be.equal(org_01);
          body.should.have.property("_id").to.be.equal(car_id_01);
          done();
        })
        .catch((err) => done(err));
    });

    it("Deleting the car 1 using DELETE /api/car/:carId works", (done) => {
      request(app)
        .delete("/api/car/" + car_id_01)
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send()
        .then((res) => {
          res.should.have.status(200);
          done();
        })
        .catch((err) => done(err));
    });

    it("Deleting the car 2 using DELETE /api/car/:carId works", (done) => {
      request(app)
        .delete("/api/car/" + car_id_02)
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send()
        .then((res) => {
          res.should.have.status(200);
          done();
        })
        .catch((err) => done(err));
    });

    it("Deleting an admin user works", (done) => {
      request(app)
        .delete("/api/user/" + config.UNITTEST_USER_EMAIL)
        .set("Authorization", "Bearer " + config.UNITTEST_JWTTOKEN)
        .send({})
        .then((res) => {
          const body = res.body;
          expect(body).to.contain.property("n");
          expect(body).to.contain.property("ok");
          expect(body).to.contain.property("deletedCount");
          done();
        })
        .catch((err) => done(err));
    });
  });
});
