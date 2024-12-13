const { create } = require('../models/shoppingCartModel');
const fs = require('fs');
require('dotenv').config();
const Facturapi = require('facturapi').default;
const path = require('path');

const facturapi = new Facturapi(process.env.FACTURAPI_SECRET_KEY);

module.exports = {
    createProduct: async (product) => {
        const facturapiProduct = {
            description: product.description,
            product_key: product.product_key,
            price: product.price
        };
        return await facturapi.products.create(facturapiProduct);
    },


    deleteProduct: async (_id) => {
        return await facturapi.products.del(_id);
    },

    createCustomer: async (customer) => {
        try {
            const facturapiCustomer = {
                legal_name: customer.legal_name,
                tax_id: customer.tax_id || 'ABC101010111',
                tax_system: '601',
                address: customer.address || {
                    zip: '63100',
                },
                email: customer.email,
                phone: customer.phone
            };
            return await facturapi.customers.create(facturapiCustomer);
        } catch (error) {
            console.error('Error al crear el usuario en Facturapi:', {
                message: error.message,
                stack: error.stack,
                response: error.response ? error.response.data : null
            });
            throw new Error('No se pudo crear el usuario en Facturapi.');
        }
    },

    updateCustomer: async (_id, rest) => {
        const facturapiCustomer = {
            ...rest
        };
        return await facturapi.customers.update(_id, facturapiCustomer);
    },


    deleteCustomer: async (id) => {
        return await facturapi.customers.del(id);
    },

    //--------------------------------------
    // Factura

    createInvoice: async (invoice) => {
        try {
            return await facturapi.invoices.create(invoice);
        } catch (error) {
            console.error('Error al crear la factura en Facturapi:', {
                message: error.message,
                stack: error.stack,
                response: error.response ? error.response.data : null
            });
            throw new Error('No se pudo crear la factura en Facturapi.');
        }
    },

    downloadInvoice: async (id) => {
        const zipPath = path.resolve(__dirname, '../downloads/factura.zip');
        const zipFile = fs.createWriteStream(zipPath);

        try {
            // Descargar PDF y XML comprimidos en archivo ZIP
            const zipStream = await facturapi.invoices.downloadZip(id);
            zipStream.pipe(zipFile);

            return new Promise((resolve, reject) => {
                zipFile.on('finish', () => {
                    zipFile.close(); // Cerrar el stream explícitamente
                    resolve(zipPath); // Devuelve la ruta absoluta
                });
                zipFile.on('error', (error) => {
                    reject(new Error(`Error al escribir el archivo ZIP: ${error.message}`));
                });
            });
        } catch (error) {
            throw new Error(`Error al descargar el ZIP: ${error.message}`);
        }
    },
}