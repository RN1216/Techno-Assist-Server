const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2lnchnk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{

        const servicesCollection = client.db('techno-assist').collection('services');
        const catagoriesCollection = client.db('techno-assist').collection('catagories');
        const bookingsCollection = client.db('techno-assist').collection('bookings');

        app.get('/services', async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        
        app.get('/catagories/',async(req,res)=>{
            const query = {};
            const catagories = await catagoriesCollection.find( query).toArray();
            res.send(catagories);
        });

        app.get('/bookings',async(req,res) =>{
            const email = req.query.email;
            console.log(email);
            const query ={email: email};
            const bookings = await bookingsCollection.find(query).toArray();
            res.send(bookings);
        });
        app.post('/bookings',async(req,res)=>{
            const booking = req.body
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        });

    }
    finally{

    }

}
run().catch(error => console.log(error))


app.get('/', (req,res)=>{
    res.send('Techno server is running')
})

app.listen(port, ()=>{
    console.log(`Techno Assist server running port: ${port}`);
})