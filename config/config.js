export default {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_books.sqlite`,
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'Secr3t',
  jwtSession: { 
    session: false
  },
};
