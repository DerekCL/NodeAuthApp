const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { mockRes, mockReq } = require("sinon-express-mock");

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
  google_access_token: `16ac896a4f7862eae6f045094377727226fc39d1856ac293c20a5a8b
  7a6aad6d0be771459dbc8cb04a65e54015ca91732c5708b3f92dc882e567935bfdc80e795d8a29
  e4b2b2684c9b5dfa72cda637591ed653d5167ee0448c92d50e2921c42348dfe808c5d6f4e1e919
  b1053e00836c67772e0c19733c8ff1163f14a2a55bb11a`,
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
  describe(`authCheck`, () => {
    it("works as expected", () => {
      const req = mockReq();
      const res = mockRes();
      const next = "";
      authCheck(req, res, next);
      expect(res.status).to.be.calledWith(200);
    });
  });
  describe(`verifyUser`, () => {
    it("works as expected", () => {
      const req = mockReq();
      const res = mockRes();
      const next = "";
      verifyUser(req, res, next);
      expect(res.status).to.be.calledWith(200);
    });
  });
});
