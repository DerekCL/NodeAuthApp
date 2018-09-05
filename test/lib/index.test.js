const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { mockRes, mockReq } = require("sinon-express-mock");
const assert = chai.assert;

const {
  index,
  logout,
  googleCallback,
  authCheck,
  verifyUser,
} = require("../../lib/index");

const app = require("../../index");

const expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiHttp);

const endpoint = `/auth/v1`;

const url = `http://www.localhost:9000${endpoint}`;

const body = {
  google_access_token: process.env.GOOGLE_ACCESS_TOKEN,
};

describe("Tests", () => {
  describe(`index`, () => {
    it("works as expected", () => {
      const req = mockReq();
      const res = mockRes();
      index(req, res);
      expect(res.status).to.be.calledWith(200);
    });
  });
  describe(`logout`, () => {
    it("works as expected", () => {
      const request = {
        logout: sinon.spy(),
      };
      const req = mockReq(request);
      const res = mockRes();
      logout(req, res);
      expect(res.json).to.be.calledWith({
        status: "success",
        request_info: "signed out",
        signed_in: false,
      });
    });
  });
  describe(`googleCallback`, () => {
    it("works as expected", () => {
      const req = mockReq();
      const res = mockRes();
      googleCallback(req, res);
      expect(res.json).to.be.calledWith({
        status: "success",
        request_info: "signed in",
        user: req.user,
        signed_in: false,
      });
    });
  });
  describe(`verifyUser`, () => {
    it("works as expected", () => {
      const request = {
        body,
      };
      const req = mockReq(request);
      const res = mockRes();
      const next = sinon.spy();
      assert(verifyUser(req, res, next), "");
    });
  });
  describe(`authCheck`, () => {
    it("works as expected", () => {
      const req = mockReq();
      const res = mockRes();
      const next = sinon.spy();
      authCheck(req, res, next);
      expect(next).to.be.called;
    });
  });
});
