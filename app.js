const express = require('express');
const routerUser = require('./src/routes/usuariosRoutes.js');
const routerCategory = require('./src/routes/categoriasRoutes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/user', routerUser);
app.use('/v1/category', routerCategory);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
