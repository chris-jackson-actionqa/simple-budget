const request = require("supertest");
const { app } = require("../../app");
const { getDb } = require("../../utils/db");
const { CONNECTION_STRING } = require("../../utils/constants");
const pgp = require("pg-promise")();

describe("Users", () => {
  let server;
  const usersToDelete = [];
  beforeAll(() => {
    const PORT = 33123;
    server = app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  });

  afterAll((done) => {
    server.close(done);
  }, 20_000);

  afterEach(async () => {
    for (let i = 0; i < usersToDelete.length; ++i) {
      console.log(`Deleting user ${usersToDelete[i]}`);
      await request(app).del(`/v0/users/${usersToDelete[i]}`);
    }

    usersToDelete.length = 0;
  });

  it("add user", async () => {
    let getUsersResponse = await request(app).get("/v0/users");
    const usersBeforeAdd = getUsersResponse.body.length;

    const response = await request(app).post("/v0/users").send({
      email: "foo@bar.com",
      password: "abcd1234",
      firstname: "test",
      lastname: "errrrrr",
    });
    usersToDelete.push(response.body.userid);
    expect(response.status).toEqual(200);

    getUsersResponse = await request(app).get("/v0/users");
    const usersAfterAdd = getUsersResponse.body.length;
    expect(usersAfterAdd).toBe(usersBeforeAdd + 1);
  });

  it("delete user", async () => {
    let getUsersResponse = await request(app).get("/v0/users");
    const usersBeforeAdd = getUsersResponse.body.length;

    const response = await request(app).post("/v0/users").send({
      email: "foo@bar.com",
      password: "abcd1234",
      firstname: "test",
      lastname: "errrrrr",
    });
    expect(response.status).toEqual(200);

    const deleteResponse = await request(app).del(
      `/v0/users/${response.body.userid}`
    );
    expect(deleteResponse.status).toEqual(200);

    getUsersResponse = await request(app).get("/v0/users");
    const usersAfterDelete = getUsersResponse.body.length;
    expect(usersAfterDelete).toBe(usersBeforeAdd);
  });

  it("get user", async () => {
    const user = {
      email: "get@user.com",
      password: "abcd1234",
      firstname: "get",
      lastname: "user",
    };
    const addResponse = await request(app).post("/v0/users").send(user);
    expect(addResponse.status).toEqual(200);

    usersToDelete.push(addResponse.body.userid);

    const getUserResponse = await request(app).get(
      `/v0/users/${addResponse.body.userid}`
    );
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.email).toEqual(user.email);
    expect(getUserResponse.body.firstname).toEqual(user.firstname);
    expect(getUserResponse.body.lastname).toEqual(user.lastname);
  });

  it("update email address", async () => {
    // GIVEN I create a new user
    const user = {
      email: "old@user.com",
      password: "abcd1234",
      firstname: "get",
      lastname: "user",
    };
    const addResponse = await request(app).post("/v0/users").send(user);
    expect(addResponse.status).toEqual(200);
    usersToDelete.push(addResponse.body.userid);

    // WHEN I update the email to a new email
    console.log(addResponse.body.userid);
    const editEmailResponse = await request(app)
      .put(`/v0/users/${addResponse.body.userid}`)
      .send({ email: "new@user.com" });

    // THEN I expect a successful response
    expect(editEmailResponse.status).toEqual(200);
    // AND I expect the user data to contain the new email in the return response
    expect(editEmailResponse.body.email).toEqual("new@user.com");
    // AND I expect the returned first and last name to be unchanged
    expect(editEmailResponse.body.firstname).toEqual(user.firstname);
    expect(editEmailResponse.body.lastname).toEqual(user.lastname);
    // AND I expect using GET /:userid will also return the new email
    const getUserResponse = await request(app).get(
      `/v0/users/${addResponse.body.userid}`
    );
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.email).toEqual("new@user.com");
    // AND I expect using GET /:userid will return an unchanged name
    expect(getUserResponse.body.firstname).toEqual(user.firstname);
    expect(getUserResponse.body.lastname).toEqual(user.lastname);
  });

  it("update first name", async () => {
    // GIVEN I create a new user
    const user = {
      email: "old@user.com",
      password: "abcd1234",
      firstname: "old",
      lastname: "old",
    };
    const addResponse = await request(app).post("/v0/users").send(user);
    expect(addResponse.status).toEqual(200);
    usersToDelete.push(addResponse.body.userid);

    // WHEN I update the first name
    const newFirstName = "new";
    const editResponse = await request(app)
      .put(`/v0/users/${addResponse.body.userid}`)
      .send({ firstname: newFirstName });

    // THEN I expect a successful response
    expect(editResponse.status).toEqual(200);
    // AND I expect the user data to contain the new first name in the return response
    expect(editResponse.body.firstname).toEqual(newFirstName);
    // AND I expect the returned email and last name to be unchanged
    expect(editResponse.body.email).toEqual(user.email);
    expect(editResponse.body.lastname).toEqual(user.lastname);
    // AND I expect using GET /:userid will also return the new first name
    const getUserResponse = await request(app).get(
      `/v0/users/${addResponse.body.userid}`
    );
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.firstname).toEqual(newFirstName);
    // AND I expect using GET /:userid will return an unchanged last name and email
    expect(getUserResponse.body.email).toEqual(user.email);
    expect(getUserResponse.body.lastname).toEqual(user.lastname);
  });

  it("update last name", async () => {
    // GIVEN I create a new user
    const user = {
      email: "old@user.com",
      password: "abcd1234",
      firstname: "old",
      lastname: "old",
    };
    const addResponse = await request(app).post("/v0/users").send(user);
    expect(addResponse.status).toEqual(200);
    usersToDelete.push(addResponse.body.userid);

    // WHEN I update the last name
    const newLastName = "new";
    const editResponse = await request(app)
      .put(`/v0/users/${addResponse.body.userid}`)
      .send({ lastname: newLastName });

    // THEN I expect a successful response
    expect(editResponse.status).toEqual(200);
    // AND I expect the user data to contain the new last name in the return response
    expect(editResponse.body.lastname).toEqual(newLastName);
    // AND I expect the returned email and first name to be unchanged
    expect(editResponse.body.firstname).toEqual(user.firstname);
    expect(editResponse.body.email).toEqual(user.email);
    // AND I expect using GET /:userid will also return the new last name
    const getUserResponse = await request(app).get(
      `/v0/users/${addResponse.body.userid}`
    );
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.lastname).toEqual(newLastName);
    // AND I expect using GET /:userid will return an unchanged first name and email
    expect(getUserResponse.body.firstname).toEqual(user.firstname);
    expect(getUserResponse.body.email).toEqual(user.email);
  });

  it("update all fields for user", async () => {
    // GIVEN I create a new user
    const user = {
      email: "old@user.com",
      password: "abcd1234",
      firstname: "old",
      lastname: "old",
    };
    const addResponse = await request(app).post("/v0/users").send(user);
    expect(addResponse.status).toEqual(200);
    usersToDelete.push(addResponse.body.userid);

    // WHEN I update all the fields for the user
    const newFields = {
      email: "new@user.com",
      firstname: "new",
      lastname: "new",
    };
    const editResponse = await request(app)
      .put(`/v0/users/${addResponse.body.userid}`)
      .send(newFields);

    // THEN I expect a successful response
    expect(editResponse.status).toEqual(200);
    // AND I expect the user data to contain the new fields
    expect(editResponse.body.lastname).toEqual(newFields.lastname);
    expect(editResponse.body.firstname).toEqual(newFields.firstname);
    expect(editResponse.body.email).toEqual(newFields.email);
    // AND I expect using GET /:userid will also return the new fields
    const getUserResponse = await request(app).get(
      `/v0/users/${addResponse.body.userid}`
    );
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body.lastname).toEqual(newFields.lastname);
    expect(getUserResponse.body.firstname).toEqual(newFields.firstname);
    expect(getUserResponse.body.email).toEqual(newFields.email);
  });

  it("400 if no fields for updating user", async () => {
    // GIVEN I create a new user
    const user = {
      email: "old@user.com",
      password: "abcd1234",
      firstname: "old",
      lastname: "old",
    };
    const addResponse = await request(app).post("/v0/users").send(user);
    expect(addResponse.status).toEqual(200);
    usersToDelete.push(addResponse.body.userid);

    // WHEN I update a user but don't provide any fields
    const editResponse = await request(app)
      .put(`/v0/users/${addResponse.body.userid}`)
      .send({});

    // THEN I should receive a 400 error code
    expect(editResponse.status).toEqual(400);
  });
});
