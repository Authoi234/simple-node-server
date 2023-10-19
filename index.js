const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple Node Server Running')
})

const users = [
    {id: 1, name: 'Sabana', email: 'sabana@gmail.com'},
    {id: 2, name: 'abana', email: 'abana@gmail.com'},
    {id: 2, name: 'lorbana', email: 'lorbana@gmail.com'}
];

app.get('/users', (req, res) => {
    res.send(users)
})

app.listen(port, () => {
    console.log(`Simple not surver running on port ${port}`);
})