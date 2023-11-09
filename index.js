const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('simple node server running')
});

app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gmail.com' },
]

// userName : dbUser1
// password : sIW70PeAaXBavPl3


const uri = "mongodb+srv://dbUser1:sIW70PeAaXBavPl3@cluster0.6iupoas.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        // const user = { name: 'amir', email: 'gorib@gmail.com' }
        // const result = await userCollection.insertOne(user)
        // console.log(result); 

        app.get('/users', async (req ,res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async (req, res) => {
            console.log('Post Api Called');
            const user = req.body;
            // users.push(user);
            // console.log(user);
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            console.log(result);
            res.send(user);
        })
    }
    finally {

    }
}

run().catch((err) => console.log(err))


// app.post('/users', (req, res) => {
//     console.log('Post Api Called');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);
//     console.log(user);
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`Simple node server running on port ${port}`);
})