const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4zmtojm.mongodb.net/?retryWrites=true&w=majority`; 

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        // all jobs 
        const mealCollection = client.db("mealsDB").collection("meals");
        const mealRequestCollection = client.db("mealsDB").collection("mealRequest");
        const upcomingMealCollection = client.db("mealsDB").collection("upcomingMeal");

        app.get('/meals', async (req, res) => {
            const cursor = mealCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/meals', async (req, res) => {
            const newMeals = req.body;
            const result = await mealCollection.insertOne(newMeals);
            res.send(result);
        })

        // mealRequestCollection

        app.post('/mealRequest', async (req, res) => {
            const newMeals = req.body;
            const result = await mealRequestCollection.insertOne(newMeals);
            res.send(result);
        })

        // upcomingMealCollection

        app.get('/upcomingMeal', async (req, res) => {
            const cursor = upcomingMealCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('FINAL EFFORT SERVER IS RUNNING')
})

app.listen(port, () => {
    console.log(`FINAL EFFORT is running on PORT: ${port}`)
})