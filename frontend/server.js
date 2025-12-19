/**
 * Frontend Node.js strežnik z API proxy podporo
 * Namen:
 * - Servira statične datoteke (HTML, CSS, JS)
 * - Posreduje API klice na backend (Spring Boot)
 */

const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Vrata in naslov backend storitve (nastavljivo preko okolja)
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';


/* --------------------------------------------------
   Middleware konfiguracija
-------------------------------------------------- */
app.use(cors()); // Dovoli zahteve iz drugih domen (npr. frontend -> backend)
app.use(bodyParser.json()); // Podpora za JSON telo zahtev
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serviraj UI iz mape /public


/* --------------------------------------------------
   Health-check (uporablja se za testovanje delovanja strežnika)
-------------------------------------------------- */
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Frontend server is running' });
});


/* --------------------------------------------------
   API PROXY – posredovanje HTTP zahtev do backend storitve
   Vsaka endpoint funkcija:
   - Prejme zahtevo od brskalnika
   - Pošlje isto zahtevo backendu
   - Vrne prejeto vsebino brskalniku
-------------------------------------------------- */

// Pridobi vse naloge
app.get('/api/todos', async (req, res) => {
    try {
        console.log('Fetching all todos from backend...');
        const response = await axios.get(`${BACKEND_URL}/api/todos`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching todos:', error.message);
        res.status(500).json({ error: 'Failed to fetch todos', details: error.message });
    }
});

// Pridobi naloge za koledarski prikaz (po mesecu in letu) - MORA BITI PRED /:id
app.get('/api/todos/calendar', async (req, res) => {
    try {
        const { year, month } = req.query;
        console.log(`Fetching todos for calendar: year=${year}, month=${month}`);
        
        if (!year || !month) {
            return res.status(400).json({ error: 'Year and month parameters are required' });
        }
        
        const response = await axios.get(`${BACKEND_URL}/api/todos/calendar`, {
            params: { year, month }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching calendar todos:', error.message);
        res.status(500).json({ error: 'Failed to fetch calendar todos', details: error.message });
    }
});

// Pridobi nalogo po ID
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
        res.status(500).json({ error: 'Failed to fetch todo', details: error.message });
    }
});

// Ustvari novo nalogo
app.post('/api/todos', async (req, res) => {
    try {
        const { title, description, completed = false, deadline } = req.body;
        console.log('Creating new todo:', { title, description, completed, deadline });

        const response = await axios.post(`${BACKEND_URL}/api/todos`, { title, description, completed, deadline });
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating todo:', error.message);
        res.status(500).json({ error: 'Failed to create todo', details: error.message });
    }
});

// Posodobi obstoječo nalogo
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed, deadline } = req.body;
        console.log(`Updating todo ${id}:`, { title, description, completed, deadline });

        const response = await axios.put(`${BACKEND_URL}/api/todos/${id}`, { title, description, completed, deadline });
        res.json(response.data);
    } catch (error) {
        console.error('Error updating todo:', error.message);
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(500).json({ error: 'Failed to update todo', details: error.message });
    }
});

// Preklopi status izvedeno / neizvedeno
app.patch('/api/todos/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Toggling completion for todo ${id}`);
        const response = await axios.patch(`${BACKEND_URL}/api/todos/${id}/toggle`);
        res.json(response.data);
    } catch (error) {
        console.error('Error toggling todo:', error.message);
        res.status(500).json({ error: 'Failed to toggle todo', details: error.message });
    }
});

// Izbriši nalogo
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
        res.status(500).json({ error: 'Failed to delete todo', details: error.message });
    }
});



/* --------------------------------------------------
   SPA Podpora (Single Page Application)
   - Če pot ni API, vedno odpre v index.html
-------------------------------------------------- */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


/* --------------------------------------------------
   Splošen handler napak
-------------------------------------------------- */
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
});


/* --------------------------------------------------
   Zagon strežnika
-------------------------------------------------- */
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Frontend server running on http://localhost:${PORT}`);
    console.log(`📡 Backend URL: ${BACKEND_URL}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, 'public')}`);
});

module.exports = app;
