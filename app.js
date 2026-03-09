/**
 * @file app.js
 * @description Point d'entrée principal de l'application Express.
 * Configure les middlewares, la connexion MongoDB et les routes.
 */

require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const catwaysRouter = require('./routes/catways');
const usersRouter = require('./routes/users');

const app = express();

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connexion MongoDB réussie'))
  .catch((err) => console.error('Erreur connexion MongoDB :', err));

// Moteur de templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares globaux
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(methodOverride('_method'));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/catways', catwaysRouter);
app.use('/users', usersRouter);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Erreur serveur' });
});

module.exports = app;
