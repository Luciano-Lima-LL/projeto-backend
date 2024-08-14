const express = require('express');
const router = express.Router();

// Simulação de banco de dados em memória
const categories = [
  { id: 1, name: 'Shoes', slug: 'shoes', use_in_menu: true },
  { id: 2, name: 'Offers', slug: 'offers', use_in_menu: true },
  { id: 3, name: 'Black Friday', slug: 'black-friday', use_in_menu: false },
  // Adicione mais categorias conforme necessário
];

// Endpoint para obter uma lista de categorias
router.get('/search', (req, res) => {
  const { limit = 12, page = 1, fields = 'name,slug', use_in_menu } = req.query;

  // Valida o parâmetro limit
  const limitNumber = parseInt(limit, 10);
  if (isNaN(limitNumber) || limitNumber < -1) {
    return res.status(400).json({ message: 'Invalid limit value' });
  }

  // Valida o parâmetro page
  const pageNumber = parseInt(page, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ message: 'Invalid page value' });
  }

  // Filtra categorias por uso no menu, se aplicável
  let filteredCategories = categories;
  if (use_in_menu) {
    const useInMenu = use_in_menu === 'true';
    filteredCategories = filteredCategories.filter(category => category.use_in_menu === useInMenu);
  }

  // Limita os campos retornados
  const fieldsArray = fields.split(',').map(field => field.trim());
  const categoriesToReturn = filteredCategories.map(category => {
    const result = {};
    fieldsArray.forEach(field => {
      if (category[field] !== undefined) {
        result[field] = category[field];
      }
    });
    return result;
  });

  // Paginação
  if (limitNumber !== -1) {
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;
    const paginatedCategories = categoriesToReturn.slice(startIndex, endIndex);
    res.status(200).json({
      data: paginatedCategories,
      total: filteredCategories.length,
      limit: limitNumber,
      page: pageNumber
    });
  } else {
    res.status(200).json({
      data: categoriesToReturn,
      total: filteredCategories.length,
      limit: -1,
      page: pageNumber
    });
  }
});

module.exports = router;
