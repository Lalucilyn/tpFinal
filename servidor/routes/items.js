var express = require('express');
var router = express.Router();
var cors = require('cors');
var busquedaController = require('../controllers/controllerCajaBusqueda');
var axios = require('axios')
/* GET users listing. */
router.get('/', busquedaController.apiBusqueda)
router.get('/item', busquedaController.apiProducto)
module.exports = router;
