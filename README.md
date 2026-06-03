# Isla de los Dinosaurios — Generador de Dinosaurios con RNN + IA Generativa

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs) ![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?logo=python) ![PyTorch](https://img.shields.io/badge/PyTorch-LSTM-EE4C2C?logo=pytorch) ![Ollama](https://img.shields.io/badge/Ollama-gemma%3A2b-black) ![HuggingFace](https://img.shields.io/badge/HuggingFace-amused--512-FFD21E?logo=huggingface)

> Aplicación web full-stack que crea dinosaurios únicos de forma autónoma: un modelo RNN (LSTM) genera el nombre carácter por carácter, Ollama (gemma:2b) redacta una descripción paleontológica en español, y un modelo de difusión genera la imagen. Proyecto de laboratorio de Redes Neuronales Recurrentes.

## ✨ Features

- **Generador de nombres con RNN**: LSTM entrenado con 1 536 nombres reales de dinosaurios, 865 K parámetros, 79.23% de accuracy por carácter
- **Pipeline nombre → descripción → imagen**: tres pasos visibles en tiempo real con indicador de progreso
- **Múltiples estrategias de muestreo**: temperatura [0.7–4.0], top-k (k=5, k=10), top-p nucleus (p=0.8, p=0.95) y combinaciones mixtas
- **Galería de 10 dinosaurios pre-generados** con nombre, configuración de muestreo y descripción
- **Dashboard del modelo**: métricas de entrenamiento (loss, perplexity, accuracy, parámetros)
- **Notebooks reproducibles** en Google Colab para entrenar la RNN y generar imágenes por difusión

## 🛠️ Stack

| Capa | Tecnología |
|------|------------|
| Frontend | HTML5 / CSS3 / JavaScript (vanilla, SPA) |
| Backend | Node.js + Express |
| Generación de nombres | Python · PyTorch · LSTM (2 capas, hidden=256) |
| Descripciones | Ollama · gemma:2b |
| Imágenes | Hugging Face Diffusers · amused/amused-512 |
| Entrenamiento | Google Colab |
| Túneles IA | ngrok |

## 🚀 Correr en local

### Requisitos

- Node.js 18+
- Los servicios de Ollama y difusión corriendo (ver sección de servicios de IA)

### Instalación

```bash
git clone <repo-url>
cd dino-web
npm install express cors axios
```

### Variables de entorno

```bash
cp .env.example .env
# Edita .env con las URLs de tus servicios
```

### Iniciar servidor

```bash
node server.js
# Abre http://localhost:8080
```

### Servicios de IA (Google Colab + ngrok)

1. **Modelo RNN**: abre `LaboratorioRNN1.ipynb` en Colab para entrenar el LSTM y descargar los pesos
2. **Endpoint de difusión**: abre `LaboratorioRNN2.ipynb` en Colab para levantar el servidor Flask + ngrok y copiar la URL pública al `.env`
3. **Ollama**: instala [Ollama](https://ollama.ai) localmente con `ollama pull gemma:2b`; expón el puerto 11434 con ngrok si el servidor corre en otra máquina

## 📁 Estructura del proyecto

```
dino-web/
├── index.html              # SPA: secciones Modelo, Ejemplos, Generador interactivo
├── server.js               # API Express (3 endpoints REST)
├── LaboratorioRNN1.ipynb   # Entrenamiento del LSTM en Google Colab
├── LaboratorioRNN2.ipynb   # Generación de imágenes con amused-512 + servidor ngrok
└── .env.example            # Variables de entorno requeridas
```

## 🧠 Arquitectura del modelo

```
Embedding (29 → 64) → LSTM (64 → 256, 2 capas, dropout 0.3) → Linear (256 → 29) → Softmax
```

- **Dataset**: 1 536 nombres reales de dinosaurios
- **Vocabulario**: 29 tokens — 26 letras + `<SOS>`, `<EOS>`, `<PAD>`
- **Entrenamiento**: 150 épocas · Adam lr=0.003 · StepLR cada 50 épocas · CrossEntropyLoss (ignorando PAD)
- **Resultados**: Loss 0.5706 · Perplexity 1.7693 · Accuracy 79.23%

## 📸 Screenshots

> 📷 Screenshots pendientes — próximamente

## 🌐 Deploy

Los endpoints de IA dependen de sesiones activas de Google Colab expuestas con ngrok. No hay un deploy permanente en este momento.
