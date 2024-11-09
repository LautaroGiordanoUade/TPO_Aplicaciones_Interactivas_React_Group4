/*const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json'); // Asegúrate de que la ruta sea correcta
const middlewares = jsonServer.defaults();
*/

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');


server.use(bodyParser.json());
server.use(middlewares);


// Middleware para manejar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Ruta personalizada para login
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get('users').value();
  console.log(users);1
  console.log(router);
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ ...user, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }
});

// Ruta personalizada para registro
server.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  const users = router.db.get('users').value();
  const userExists = users.some(u => u.email === email);

  if (userExists) {
    res.status(400).json({ message: 'El usuario ya existe' });
  } else {
    const newUser = { id: Date.now(), username, email, password };
    router.db.get('users').push(newUser).write();
    res.json({ ...newUser, token: 'fake-jwt-token' });
  }
});

server.post('/auth/reset-password', (req, res) => {
  const { email } = req.body;
  const users = router.db.get('users').value();
  const userExists = users.some(u => u.email === email);

  if (!userExists) {
    res.status(400).json({ message: 'El usuario no existe' });
  } else {
    return res.json({ userExists });;
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server está ejecutándose en http://localhost:3000');
});
