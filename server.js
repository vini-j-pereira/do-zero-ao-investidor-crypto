const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const emailjs = require('emailjs-com');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Inicialize o EmailJS
emailjs.init(process.env.EMAILJS_USER_ID); // Substitua com seu USER_ID do EmailJS

// Endpoint para criar um novo usuário
app.post('/api/signup', async (req, res) => {
  const { fullName, phone, email } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { fullName, phone, email },
    });

    // Enviar o e-book por email
    const templateParams = {
      fullName,
      phone,
      email,
      ebook_link: 'https://drive.google.com/uc?export=download&id=1wIvJOXF5SDhBvvefH6rNfIJEPky2N9Jr' // Substitua pela URL do seu e-book
    };

    emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, templateParams)
      .then(function(response) {
        res.status(201).json(newUser);
      }, function(error) {
        res.status(400).json({ error: 'Erro ao enviar e-book: ' + JSON.stringify(error) });
      });
  } catch (error) {
    res.status(400).json({ error: 'Email já cadastrado' });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
