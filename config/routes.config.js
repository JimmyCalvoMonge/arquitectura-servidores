// Fichero de rutas.

const express = require("express");
const router = express.Router();
const users = require('../controllers/users.controller'); // Visto en Clase Semana 02
const posts = require('../controllers/posts.controller'); // Para Actividad Semana 02

// Clase Semana 02:

router.get("/users",users.list);
router.get('/users/:id',users.detail);
router.post('/users',users.create);
router.patch('/users/:id',users.update);
router.delete('/users/:id',users.delete);

// Actividad Semana 02:

router.get("/posts",posts.list);
router.get('/posts/:id',posts.detail);
router.post('/posts',posts.create);
router.patch('/posts/:id',posts.update);
router.delete('/posts/:id',posts.delete);

module.exports = router;