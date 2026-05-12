const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const OLLAMA_URL = "https://compare-exert-flying.ngrok-free.dev";
const DIFFUSION_URL = "https://darkening-slashed-sixfold.ngrok-free.dev";

app.post('/api/nombre', async (req, res) => {
    const sufijos = ['saurus', 'raptor', 'odon', 'venator', 'ceratops'];
    const prefijos = ['mega', 'micro', 'tyranno', 'brachio', 'ankylo', 'ptero'];
    const prefijo = prefijos[Math.floor(Math.random() * prefijos.length)];
    const sufijo = sufijos[Math.floor(Math.random() * sufijos.length)];
    const nombre = prefijo.charAt(0).toUpperCase() + prefijo.slice(1) + sufijo;
    res.json({ nombre });
});

app.post('/api/descripcion', async (req, res) => {
    try {
        const { nombre } = req.body;
        const prompt = `Eres un paleontólogo experto. Para el dinosaurio llamado ${nombre}, genera una descripción breve de 3 líneas en español que incluya qué significa el nombre, período geológico y características físicas. Solo la descripción, sin títulos.`;
        const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: "gemma:2b",
            prompt,
            stream: false
        }, { headers: { "ngrok-skip-browser-warning": "true" } });
        res.json({ descripcion: response.data.response });
    } catch (err) {
        console.error('Error descripcion:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/imagen', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const prompt = `A realistic dinosaur called ${nombre}. ${descripcion} Prehistoric landscape, detailed, high quality.`;
        const response = await axios.post(`${DIFFUSION_URL}/generate`,
            { prompt },
            {
                headers: { "ngrok-skip-browser-warning": "true" },
                responseType: 'arraybuffer'
            }
        );
        const base64 = Buffer.from(response.data).toString('base64');
        res.json({ imagen: `data:image/png;base64,${base64}` });
    } catch (err) {
        console.error('Error imagen:', err.message);
        res.status(500).json({ error: err.message });
    }
});

app.listen(8080, () => console.log('✅ Servidor corriendo en puerto 8080'));
