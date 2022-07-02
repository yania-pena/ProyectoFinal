const express = require('express')
const router = express.Router()
const horariosController = require('../controllers/horariosController')

router.get('/', horariosController.index)
router.get('/crear', horariosController.crear)
router.get('/editar/:id', horariosController.editar)
router.post('/eliminar/:id', horariosController.eliminar)
router.post('/guardar', horariosController.guardar)
router.post('/actualizar', horariosController.actualizar)
router.get('/comparacion', horariosController.comparacion)
router.post('/resultados', horariosController.resultados)
//router.get('/comparacionfecha', horariosController.comparacionfecha)
//router.post('/resultados2', horariosController.resultados2)


module.exports = router