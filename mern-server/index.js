const express = require('express')
const app = express()
const port = process.env.PORT || 4000 ;
const cors = require('cors')


// middleWare

app.use(cors());
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello World!')
})

// MongoDB Configurtion 


const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const uri = "mongodb+srv://Book-Store:bookStore.com@cluster0.jdoeni7.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();

//  create a Collection of DB
   const bookCollection = client.db('bookInventory').collection('books')

   app.post("/upload-books" ,async (req , res) => {
    const data = req.body;
    const result = await bookCollection.insertOne(data)
    res.send(result)

   })

//    get all books from the data base 

//    app.get("/all-books" , async(req, res) => {
//     const books = bookCollection.find();
//     const result = await books.toArray()
//     res.send(result)
//    })


//    updata data 

app.patch("/books/:id", async(req,res) => {
    const id = req.params.id;
    // console.log(id)
    const updateBookData = req.body;
    const filter = { _id: new ObjectId(id)};
    const updateDoc = {
        $set: {
            ...updateBookData
        },
    }
    const options = { upsert: true };
    // update 
    const result = await bookCollection.updateOne(filter,updateDoc,options)
    res.send(result)
})

//  delete book data 

app.delete("/books/:id", async(req,res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id)};
    const result = await bookCollection.deleteOne(filter)
    res.send(result)


})

// find by category 
 app.get("/all-books" , async(req, res) => {
    let query = {};
    if(req.query?.category){
        query = {category: req.query.category}
    }
    const result = await bookCollection.find(query).toArray();
    res.send(result)
 })

//  to get Single Book data 

app.get("/books/:id", async (req,res) => {
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const result = await bookCollection.findOne(filter)
  res.send(result)

})
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})