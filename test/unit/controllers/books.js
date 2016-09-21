import BooksController from './../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResp = [{
        id: 1,
        name: 'Test Books',
        create_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z',
      }];

      td.when(Books.findAll({}))
                .thenResolve(expectedResp);

      const booksController = new BooksController(Books);

      return booksController.getAll()
                .then(response => expect(response.data).to.be.eql(expectedResp));
    });
  });

  describe('Get all books: getById()', () => {
    it('should return a book', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResp = [{
        id: 1,
        name: 'Test Books',
        create_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z',
      }];

      td.when(Books.findOne({ where: { id: 1 } }))
                .thenResolve(expectedResp);

      const booksController = new BooksController(Books);

      return booksController.findById({ id: 1 })
                .then(response => expect(response.data).to.be.eql(expectedResp));
    });
  });

  describe('Create a books: getById()', () => {
    it('should create a book', () => {
      const Books = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Book',
      };

      const expectedResp = [{
        id: 1,
        name: 'Test Book',
        create_at: '2016-08-06T23:55:36.692z',
        updated_at: '2016-08-06T23:55:36.692z',
      }];

      td.when(Books.create(requestBody))
                .thenResolve(expectedResp);

      const booksController = new BooksController(Books);

      return booksController
                .create(requestBody)
                .then((response) => {
                  expect(response.statusCode).to.be.eql(201);
                  expect(response.data).to.be.eql(expectedResp);
                });
    });
  });

  describe('Update a books: getById()', () => {
    it('should update an existing book', () => {
      const Books = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test Book Update',
      };

      const expectedResp = [1];

      td.when(Books.update(requestBody, { where: { id: 1 } }))
                .thenResolve(expectedResp);

      const booksController = new BooksController(Books);

      return booksController
                .update(requestBody, { id: 1 })
                .then((response) => {
                  expect(response.data).to.be.eql(expectedResp);
                });
    });
  });

  describe('Delete a books: getById()', () => {
    it('should delete a book', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } }))
                .thenResolve({});

      const booksController = new BooksController(Books);

      return booksController
                .delete({ id: 1 })
                .then((response) => {
                  expect(response.statusCode).to.be.eql(204);
                });
    });
  });
});
