import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 8000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the products directory path
const dir = path.join(__dirname, 'products');

// Root route
app.get('/', (req, res) => {
    res.send("Hello World! I am Bhaanoo Vishwakarma");
});

// Product route
app.get('/product', (req, res) => {
    const filePath = path.join(dir, 'products.json');

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Products file not found');
        } else {
            // Read and send the products.json file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).send('Error reading the products file');
                } else {
                    res.json(JSON.parse(data));
                }
            });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running @ ${port}`);
});
