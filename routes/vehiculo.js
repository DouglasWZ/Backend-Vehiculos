const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

// Controlador
const { registrar, mostrar } = require('../controllers/vehiculo');

const router = Router();

//Rutas 
router.post('/', [
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio').not().isEmpty(),
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    validarCampos
], registrar);

router.get('/', mostrar);

module.exports = router;


