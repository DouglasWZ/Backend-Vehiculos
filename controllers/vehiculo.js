const Vehiculo = require("../models/vehiculo");

// Peticiones HTTP

const registrar = async (req, res) => {
  const { marca, modelo, placa } = req.body;
  const vehiculo = new Vehiculo({ marca, modelo, placa });

  // prevenir vehiculos duplicados
  const existeVehiculo = await Vehiculo.findOne({ placa });

  if (existeVehiculo) {
    const error = new Error("Vehículo ya registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    // Guardar nuevo vehículo
    const vehiculoGuardado = await vehiculo.save();

    res.status(200).json({
      msg: "Registrando vehiculo...",
      vehiculoGuardado,
    });
  } catch (error) {
    console.log(error);
  }
};

// Mostrar Vehiculos
const mostrarVehículos = async (req, res) => {
  const vehiculos = await Vehiculo.find();

  try {
    res.status(200).json({
      vehiculos
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registrar,
  mostrarVehículos,
};
