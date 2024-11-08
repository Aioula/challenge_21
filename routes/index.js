const express = require('express');
const router = express.Router();

// Home Page
router.get('/', (req, res) => {
    res.render('home');
});

// Shop Page
router.get('/shop', async (req, res) => {
    const books = await Book.find(); // Assume book model is set up
    res.render('shop', { books });
});

// Insert New Products
router.get('/insert', (req, res) => {
    res.render('insert');
});

router.post('/insert', async (req, res) => {
    const { title, author, price } = req.body;
    const newBook = new Book({ title, author, price });
    await newBook.save();
    res.redirect('/shop');
});

// Login Routes
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
