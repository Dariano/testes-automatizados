const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode);

class BooksController {
  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
  }

  findById(params) {
    return this.Books.findOne({ where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
  }

  create(book) {
    return this.Books.create(book)
            .then(result => defaultResponse(result, 201))
            .catch(error => errorResponse(error.message, 422));
  }

  update(book, params) {
    return this.Books.update(book, { where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, 422));
  }

  delete(params) {
    return this.Books.destroy({ where: params })
            .then(result => defaultResponse(result, 204))
            .catch(error => errorResponse(error.message, 422));
  }
}

export default BooksController;
