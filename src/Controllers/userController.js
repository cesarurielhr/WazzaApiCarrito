const User = require('../Models/userModels');
const { createCustomer, deleteCustomer } = require('../Apis/facturapi'); // Servicios de Facturapi

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Crear un usuario y sincronizar con Facturapi
exports.createUser = async (req, res) => {
    try {
        const customer = req.body.facturapi_customer
        // Crear cliente en Facturapi
        const facturapiResponse = await createCustomer(customer);
        console.log('Usuario creado en Facturapi:', facturapiResponse);

        // Guardar en MongoDB con el ID de Facturapi como _id
        const user = new User({
            _id: facturapiResponse.id, // Asignar el ID de FacturAPI como _id
            ...req.body, // Incluir el resto de los datos del cuerpo de la solicitud
            facturapiId: facturapiResponse.id // Guardar el ID de FacturAPI por consistencia
        });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        console.error('Error en la creación del usuario:', error.message);
        res.status(400).json({ message: 'No se pudo crear el usuario.' });
    }
};

// Eliminar un usuario de MongoDB y Facturapi
exports.deleteUserByFacturapiId = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
           return res.status(400).json({message: `No se encontro el usuario ಥ_ಥ`});
        }

        if(user.facturapi_customer){
           await deleteCustomer(user.facturapi_customer.id);
        }

        return res.status(200).json(user);
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({message: `No se pudo eliminar el usuario ＼（〇_ｏ）／ ${error.message}`});
    }
};
