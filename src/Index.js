// Importar módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');

// Configurar el servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Usar rutas
app.use('/users', userRoutes);

// Conexión a la base de datos y arranque del servidor
mongoose.connect('mongodb+srv://admin:admin@apirestcarrito.f2fyz.mongodb.net/?retryWrites=true&w=majority&appName=APIRestCarrito', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
});
