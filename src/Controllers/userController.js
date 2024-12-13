const userModels = require('../Models/userModels');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModels.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userModels.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const user = await userModels.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userModels.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.createFacturapiCustomer = async (req, res) => {
    try {
        const user = await userModels.createFacturapiCustomer(req.params.id, req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
