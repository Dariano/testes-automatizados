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
      request
                .get('/books')
                .end((err, res) => {
                  expect(res.body[0].id).to.be.eql(defaultBook.id);
                  expect(res.body[0].name).to.be.eql(defaultBook.name);

                  done(err);
                });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('shoud return a book', (done) => {
      request
                .get('/books/1')
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(defaultBook.id);
                  expect(res.body.name).to.be.eql(defaultBook.name);

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

      request
                .post('/books')
                .send(newBook)
                .end((err, res) => {
                  expect(res.body.id).to.be.eql(newBook.id);
                  expect(res.body.name).to.be.eql(newBook.name);

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

      request
                .put(`/books/${updateBook.id}`)
                .send(updateBook)
                .end((err, res) => {
                  expect(res.body).to.be.eql([1]);

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
