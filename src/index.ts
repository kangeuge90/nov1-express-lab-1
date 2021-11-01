// BASIC EXPRESS SETUP
import express from 'express';
import cart from './routes/cart';
import cors from 'cors';

const app = express(); // running a new instance of your server

app.use(express.json()); // allows us to access the request body as a Javascript Object
// this is essestially a plugin

app.use(cors());
// add cors functionality

app.use('/hello/', hello) // Everything after /hello/ will use the hello typescript file 





const port = 3000; // very common choice of development server



app.listen(port, () => {
    console.log("Started server at http://localhost:" + port)
}) // starting the server

// BASIC EXPRESS SETUP END

// app.get('/hello', (req, res) => {
//     console.log(req);
//     res.json("Hello, World!");
// }); // we make a GET request to /hello, respond with a Hello World message
// replacing this with router

app.post('/', (req,res) => {
    res.json("You made a POST request");
}); // when the browser makes a query request to this path3019, we will return this message
// to test: 


