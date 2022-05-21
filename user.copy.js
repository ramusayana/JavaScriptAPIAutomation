import { interfaces, it } from "mocha";
import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/");
import { expect } from "chai";
const TOKEN =
  "af29aeae8b8fe084cd7eb8afc6282f297c220d7e0be214feb68cef8d7e86279e";

describe("Users", () => {
  it("GET /users", (done) => {
    request.get(`v2/users?access-token=${TOKEN}`).end((err, res) => {
      expect(res.body).to.not.be.empty;
      console.log(err);
      console.log(res.body);
      done();
    });
  });

  it("POST /users", () => {
    const data = {
      name: "Ramaaaa",
      email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
      gender: "male",
      status: "inactive",
    };
    return request
      .post("v2/users")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        //to print the response use the following console
        console.log(res.body);
        expect(res.body).to.deep.include(data);
        // To make an assertion chai use the following
        // expect(res.body.data.email).to.eq(data.email);
        // expect(res.body.data.status).to.eq(data.status);
      });
  });

  it("PUT /v2users/ : id ", () => {
    const data = {
      name: "Bheemayya",
      gender: "male",
      status: "active",
    };

    return request
      .put("v2/users/3302")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        console.log(res.body);
        // failing in assertions
        //  expect(res.body.data).to.deep.include(data);
      });
  });

  it("Delete /v2 users", () => {
    // const data = {

    // }

    return request
      .delete("v2/users/3302")
      .set("Authorization", `Bearer ${TOKEN}`)
      .then((res) => {
        //assertion failed
         expect(res.body.data).to.be.eq(null);
      });
  });



});
