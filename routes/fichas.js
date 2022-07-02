const express = require('express')
const router = express.Router()
const fichasController = require('../controllers/fichasController')

router.get('/', fichasController.index)
router.get('/crear', fichasController.crear)
router.get('/editar/:id', fichasController.editar)
router.post('/eliminar/:id', fichasController.eliminar)
router.post('/guardar', fichasController.guardar)
router.post('/actualizar', fichasController.actualizar)
router.post('/ver/:id', fichasController.ver)
router.post('/buscar', fichasController.buscar)
module.exports = router