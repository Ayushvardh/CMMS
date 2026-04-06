const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h2>Addition Form</h2>
        <form action="/add" method="POST">
            <input type="number" name="num1" placeholder="First Number" required><br>
            <input type="number" name="num2" placeholder="Second Number" required><br>
            <button type="submit">Add</button>
        </form>
    `);
});

app.post('/add', (req, res) => {
    const n1 = parseFloat(req.body.num1);
    const n2 = parseFloat(req.body.num2);
    const sum = n1 + n2;

    res.send(`<h3>Result: ${n1} + ${n2} = ${sum}</h3><a href="/">Go Back</a>`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});