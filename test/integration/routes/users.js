describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'teste@mail.com',
    password: 'test',
  };

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => done());
  });

  describe('Route GET /users', () => {
    it('shoud return a list of users', (done) => {
      request
          .get('/users')
          .end((err, res) => {
            expect(res.body[0].id).to.be.eql(defaultUser.id);
            expect(res.body[0].name).to.be.eql(defaultUser.name);
            expect(res.body[0].email).to.be.eql(defaultUser.email);

            done(err);
          });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('shoud return a user', (done) => {
      request
                .get('/users/1')
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(defaultUser.id);
                  expect(res.body.name).to.be.eql(defaultUser.name);
                  expect(res.body.email).to.be.eql(defaultUser.email);

                  done(err);
                });
    });
  });

  describe('Route POST /users', () => {
    it('shoud create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'new User',
        email: 'new@mail.com',
        password: 'newtest',
      };

      request
          .post('/users')
          .send(newUser)
          .end((err, res) => {
            expect(res.body.id).to.be.eql(newUser.id);
            expect(res.body.name).to.be.eql(newUser.name);
            expect(res.body.email).to.be.eql(newUser.email);

            done(err);
          });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('shoud update a user', (done) => {
      const updateUser = {
        id: 1,
        name: 'update user',
        email: 'newemail@mail.com',
      };

      request
          .put(`/users/${updateUser.id}`)
          .send(updateUser)
          .end((err, res) => {
            expect(res.body).to.be.eql([1]);

            done(err);
          });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('shoud delete a user', (done) => {
      request
          .delete(`/users/${defaultUser.id}`)
          .end((err, res) => {
            expect(res.statusCode).to.be.eql(204);

            done(err);
          });
    });
  });
});
