// Importar módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');
const productsRoutes = require('./Routes/productsRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const fileUpload = require('express-fileupload');  // Declaración correcta

// Configurar el servidor Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads' // Directorio temporal para los archivos
}));

app.get('/', (req, res, next) => {
    res.send(
        `<h1>API RESTFULL de Carrito de Compras</h1> <p> Leer: <a href="docs.com">api-tasks-docs</a> para mas información.</p>`
    );
});

// Usar rutas
app.use('/api', userRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

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
