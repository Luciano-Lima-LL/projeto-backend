const express = require('express');
const routerUser = require('./src/routes/usuariosRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/v1/user', routerUser);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
