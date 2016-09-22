describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
  };

  beforeEach((done) => {
    Books
        .destroy({ where: {} })
        .then(() => Books.create(defaultBook))
        .then(() => done());
  });

  describe('Route GET /books', () => {
    it('shoud return a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
            .get('/books')
            .end((err, res) => {
              joiAssert(res.body, booksList);

              done(err);
            });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('shoud return a book', (done) => {
      const booksList = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .get('/books/1')
        .end((err, res) => {
          joiAssert(res.body, booksList);

          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('shoud create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'newBook',
      };

      const booksList = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, booksList);

          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('shoud update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'update book',
      };

      const udpateCount = Joi.array().items(1);

      request
        .put(`/books/${updateBook.id}`)
        .send(updateBook)
        .end((err, res) => {
          joiAssert(res.body, udpateCount);

          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('shoud delete a book', (done) => {
      request
        .delete(`/books/${defaultBook.id}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
