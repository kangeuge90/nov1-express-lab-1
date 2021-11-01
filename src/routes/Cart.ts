import express from 'express';
import cartItem from '../models/cartItem';
import ClassItem from '../models/classItem';

const cart = express.Router();

// const cartItems = [,
//     {
//         id:
//         product:
//         price:
//         quantity:
//     },
// ]

const cartItems: cartItem[] = [
    new ClassItem(1, 'iron', 30.00, 5),
    new ClassItem(2, 'computer', 500.00, 2),
    new ClassItem(3, 'mouse', 20.00, 6)
]

cart.get('/', (req, res) => {
    res.json("Hello, you");
})

// 1.  
// GET /cart-items
// Action: None
// Response: a JSON array of all cart items
// Response Code: 200 (OK)
// Query string parameters: the request may have one of the following or it may have none. 
// (See test cases below for examples.)
// maxPrice - if specified, only include products that are at or below this price.
// prefix - if specified, only includes products that start with the given string in the response array.
// pageSize - if specified, only includes up to the given number of items in the response array. 
// For example, if there are ten items total, but pageSize=5, only return an array of the first five items.

cart.get('/cart-items', (req, res) => {
    res.json(cartItems); // return the cartItems array  -----API TECHNIQUE -----
})

// 2.  
// GET /cart-items/:id
// Action: None
// Response: a JSON object of the item with the given ID
// Response Code: 200 (OK)
// However, if the item with that ID cannot be found in the array, return a string 
// response “ID Not Found” with response code 404 (Not Found)

cart.get('/cart-items/:id', (req,res,next) => {
    for (let item of cartItems) {
    const foundItem = req.params.id;
        if (foundItem !== undefined) { // void might be an option as well, but undefined seems to fit better here
            res.send(foundItem);
        } else {
            res.status(404).send();
        }
    }
});

// 3.
// POST /cart-items  
// Action: Add a cart item to the array using the JSON body of the request. Also 
// generate a unique ID for that item.
// Response: the added cart item object as JSON.
// Response Code: 201 (Created)

cart.post('/cart-items', (req, res) => {

})

// 4. 
// PUT /cart-items/:id 
// Action: Update the cart item in the array that has the given id. Use the JSON body of 
// the request as the new properties.
// Response: the updated cart item object as JSON.
// Response Code: 200 (OK).

cart.put('/cart-items/:id', (req, res) => {

})

// 5. 
// DELETE /cart-items/:id 
// Action: Remove the item from the array that has the given ID.
// Response: Empty
// Response Code: 204 (No Content)

cart.delete('/cart-items/:id', (req, res) => {
    
})



// cart.get('/:name', (req,res) => {
//     // get the name
//     const name = req.params.name; // or req.params.id

//     const lastName = req.query.last; // pull ?last= query string

//     res.json("Hello, " + name + ' ' + lastName);
// })

export default cart;