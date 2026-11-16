const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Allow the server to read form data.
app.use(express.urlencoded({ extended: true }));

// Serve the stylesheet and other static files from public.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.post('/contact', (req, res) => {
    const name = escapeHtml(req.body.name || '');

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message received | My Website</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <main class="content">
                <h1>Thank you, ${name}!</h1>
                <p>Your message has been received.</p>
                <a class="btn" href="/">Return to Home</a>
            </main>
        </body>
        </html>
    `);
});

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => {
        const entities = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return entities[character];
    });
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
