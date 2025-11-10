const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8081';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Frontend server is running' });
});

// API proxy routes
app.get('/api/todos', async (req, res) => {
    try {
        console.log('Fetching all todos from backend...');
        const response = await axios.get(`${BACKEND_URL}/api/todos`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        res.status(500).json({
            error: 'Failed to fetch todos',
            details: error.message
        });
    }
});

app.get('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching todo with ID: ${id}`);
        const response = await axios.get(`${BACKEND_URL}/api/todos/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching todo:', error.message);
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(500).json({
            error: 'Failed to fetch todo',
            details: error.message
        });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const { title, description, completed = false } = req.body;
        console.log('Creating new todo:', { title, description, completed });

        const response = await axios.post(`${BACKEND_URL}/api/todos`, {
            title,
            description,
            completed
        });

        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating todo:', error.message);
        res.status(500).json({
            error: 'Failed to create todo',
            details: error.message
        });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        console.log(`Updating todo ${id}:`, { title, description, completed });

        const response = await axios.put(`${BACKEND_URL}/api/todos/${id}`, {
            title,
            description,
            completed
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error updating todo:', error.message);
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(500).json({
            error: 'Failed to update todo',
            details: error.message
        });
    }
});

app.patch('/api/todos/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Toggling completion for todo ${id}`);

        const response = await axios.patch(`${BACKEND_URL}/api/todos/${id}/toggle`);
        res.json(response.data);
    } catch (error) {
        console.error('Error toggling todo:', error.message);
        res.status(500).json({
            error: 'Failed to toggle todo',
            details: error.message
        });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting todo with ID: ${id}`);

        await axios.delete(`${BACKEND_URL}/api/todos/${id}`);
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(500).json({
            error: 'Failed to delete todo',
            details: error.message
        });
    }
});

// Serve HTML page for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error',
        details: error.message
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Frontend server running on http://localhost:${PORT}`);
    console.log(`📡 Backend URL: ${BACKEND_URL}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
});

module.exports = app;