const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

// Controlador
const { registrar, mostrarVehículos, eliminarVehiculo } = require('../controllers/vehiculo');

const router = Router();

//Rutas 
router.post('/', [
    check('marca', 'La marca es obligatoria').not().isEmpty(),
    check('modelo', 'El modelo es obligatorio').not().isEmpty(),
    check('placa', 'La placa es obligatoria').not().isEmpty(),
    validarCampos
], registrar);

router.get('/', mostrarVehículos);
router.delete('/', eliminarVehiculo);

module.exports = router;


