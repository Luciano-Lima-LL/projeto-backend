const express = require('express');
const routerUser = require('./src/routes/usuariosRoutes'); // Corrija o caminho conforme necessário
const app = express();

// Middleware para interpretar JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar o roteador de usuários para rotas que começam com /v1/user
app.use('/v1/user', routerUser);

// Inicia o servidor na porta 10000
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

