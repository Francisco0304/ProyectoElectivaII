const express = require('express');
const path = require('path');
const cors = require('cors'); // Importar el middleware cors

const app = express();

app.set('PORT', process.env.PORT || 3200);

// Habilitar el middleware CORS
const corsOptions = {
  origin: 'https://backluis.vercel.app', // Asegúrate de que este sea el origen correcto
  optionsSuccessStatus: 200 // Para algunos navegadores antiguos
};

app.use(cors(corsOptions));

app.use(express.static(__dirname + "/public/"));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/book.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'book.html'));
});

app.get('/catalog.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'catalog.html'));
});

app.get('/loanreservation.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'loanreservation.html'));
});

app.get('/loan.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'loan.html'));
});

app.listen(app.get('PORT'), () => console.log(`Server front in port ${app.get('PORT')}`));
