const express = require('express');
const router = express.Router();

let users = [
  { id: 1, firstname: "user firstname", surname: "user surname" , email: "user@mail.com" },
  { id: 2, firstname: "user secondname", surname: "sec surname", email: "user2@mail.com" }
];

const getUserById = (id) => users.find(user => user.id === id);

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'deu certo não pai' });
  } 
});

module.exports = router;

router.post('/', (req, res) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  if (!firstname || !surname || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const newUser = {
    id: users.length + 1,
    firstname,
    surname,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

const checkToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Token missing or invalid' });
  }
};

router.put('/:id', checkToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { firstname, surname, email } = req.body;

  if (!firstname || !surname || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = { id, firstname, surname, email };
  res.status(204).send();
});

router.delete('/:id', checkToken, (req, res) => {
  const id = parseInt(req.params.id, 10);

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});


