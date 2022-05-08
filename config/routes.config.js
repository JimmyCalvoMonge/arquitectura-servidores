// Fichero de rutas.

const express = require("express");
const router = express.Router();
const users = require('../controllers/users.controller'); // Visto en Clase Semana 02
const posts = require('../controllers/posts.controller'); // Para Actividad Semana 02
const auth = require('../middlewares/auth.middleware'); // Para Actividad Semana 03

// Agregamos autenticacion con JWT para varios endpoints de nuestra API. Excepto para los get(/posts) y get(/users).
// Agregados en actividad semana 03

router.get("/users",auth.checkAuth,users.list); 
router.get('/users/:id',auth.checkAuth,users.detail);
router.get('/users/:id/validate',users.validate); // Semana 04 VALIDACION DE USUARIOS.
router.post('/users',users.create); // No necesita estar autenticada.
router.patch('/users/:id',auth.checkAuth,users.update);
router.delete('/users/:id',auth.checkAuth,users.delete);

// Actividad Semana 02:
router.get("/posts",auth.checkAuth,posts.list); 
router.get('/posts/:id',auth.checkAuth,posts.detail);
router.post('/posts',posts.create); // No necesita estar autenticada.
router.patch('/posts/:id',auth.checkAuth,posts.update);
router.delete('/posts/:id',auth.checkAuth,posts.delete);

// Actividad Semana 03:
router.post('/login', users.login);

module.exports = router;