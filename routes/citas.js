const express = require('express')
const router = express.Router()
const citasController = require('../controllers/citasController')

router.get('/', citasController.index)
router.get('/crear', citasController.crear)
router.get('/editar/:id', citasController.editar)
router.post('/eliminar/:id', citasController.eliminar)
router.post('/guardar', citasController.guardar)
router.post('/actualizar', citasController.actualizar)
router.get('/comparacionfecha', citasController.comparacionfecha)
router.post('/resultados2', citasController.resultados2)
module.exports = router