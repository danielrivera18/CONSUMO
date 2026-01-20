const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const API_URL = 'https://venta-omega.vercel.app/cartera';

// GET /cartera
app.get('/cartera', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error in GET /cartera:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Error creating request to upstream service',
            details: error.message
        });
    }
});

// POST /cartera
app.post('/cartera', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error in POST /cartera:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Error creating request to upstream service',
            details: error.message
        });
    }
});

// PUT /cartera/:id
app.put('/cartera/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.put(`${API_URL}/${id}`, req.body);
        res.json(response.data);
    } catch (error) {
        console.error(`Error in PUT /cartera/${id}:`, error.message);
        res.status(error.response?.status || 500).json({
            error: 'Error creating request to upstream service',
            details: error.message
        });
    }
});

// Fallback for Vercel/Local
app.get('/', (req, res) => {
    res.send('Microservice is running. Endpoints: GET/POST /cartera, PUT /cartera/:id');
});

// Start server if running locally
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
