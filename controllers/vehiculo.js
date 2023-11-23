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
      vehiculos,
    });
  } catch (error) {
    console.log(error);
  }
};

// Eliminar Vehículo
const eliminarVehiculo = async (req, res) => {
  const { placa } = req.params;
  const vehiculo = await Vehiculo.findOne({ placa });

  // Si no hay vehículo
  if (!vehiculo) {
    return res.status(404).json({ msg: "Vehículo no encontrado" });
  }

  try {
    await vehiculo.deleteOne();
    res.status(200).json({
      msg: `Vehículo con placa ${placa} eliminado correctamente`,
    });
  } catch (error) {
    console.log(error);
  }
};

// Actualizar Vehículo
const actualizarVehiculo = async (req, res) => {
  const { placa } = req.params;
  const vehiculo = await Vehiculo.findOne({ placa });

  // Si no hay vehículo
  if (!vehiculo) {
    return res.status(400).json({ msg: "No encontrado" });
  }

  //Actualizar Vehículo
  vehiculo.marca = req.body.marca || vehiculo.marca;
  vehiculo.modelo = req.body.modelo || vehiculo.modelo;
  vehiculo.placa = req.body.placa || vehiculo.placa;

  try {
    const vehiculoActualizado = await vehiculo.save();
    res.json(vehiculoActualizado);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registrar,
  mostrarVehículos,
  eliminarVehiculo,
  actualizarVehiculo
};
