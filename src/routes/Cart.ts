import express from 'express';
import cartItem from '../models/cartItem';
import ClassItem from '../models/classItem';

const routes = express.Router();

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

let nextId = 4

routes.get('/', (req, res) => {
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

routes.get('/cart-items', (req, res) => {
    let filteredItems = cartItems; // by default return everything

    if (req.query.maxPrice) {
		const maxPrice = parseFloat(req.query.maxPrice as string); // decimals, typecasting as string parseFloat will convert the given string
                                                                    // into a decimal

		filteredItems = filteredItems.filter((cartItem) => {
            return cartItem.price <= maxPrice;  // Does this target the maximum price or the minimum price?
        });
	}

    // EXAMPLE:
    // if (req.query.minRating) {
	// 	const minRating = parseFloat(req.query.minRating as string); // decimals, typecasting as string

	// 	filteredShops = filteredShops.filter((shop) => {
    //         return shop.rating >= minRating;
    //     });
	// }

    res.json(filteredItems); 

    // return the cartItems array  -----API TECHNIQUE -----
})

// 2.  
// GET /cart-items/:id
// Action: None
// Response: a JSON object of the item with the given ID
// Response Code: 200 (OK)
// However, if the item with that ID cannot be found in the array, return a string 
// response “ID Not Found” with response code 404 (Not Found)

routes.get('/cart-items/:id', (req,res) => {
    const id = parseInt(req.params.id); // whole numbers

	// find the shop that matches this id
	const foundItem = cartItems.find(looking => looking.id === id); // looking for one match

    
        if (foundItem !== undefined) { // void might be an option as well, but undefined seems to fit better here
            res.send(foundItem);
        } else {
            res.status(404);
            res.json({
                error: `Item not found: ${id}`,
            });
        }
});

// 3.
// POST /cart-items  
// Action: Add a cart item to the array using the JSON body of the request. Also 
// generate a unique ID for that item.
// Response: the added cart item object as JSON.
// Response Code: 201 (Created)

routes.post('/cart-items', (req, res) => {
    //  constructing item elements, but perhaps this is the forms technique?
    const newId = nextId
    nextId++
    const newProduct = req.body.product
    const newPrice = req.body.price
    const newQuantity = req.body.quantity
    res.status(201);
    const newCartItem = {id: newId, product: newProduct, price: newPrice, quantity: newQuantity}
    cartItems.push(newCartItem);
    res.json(newCartItem) // res.render is HTML, json is data, new object constructed


})

// 4. 
// PUT /cart-items/:id 
// Action: Update the cart item in the array that has the given id. Use the JSON body of 
// the request as the new properties.
// Response: the updated cart item object as JSON.
// Response Code: 200 (OK).

routes.put('/cart-items/:id', (req, res) => {
    req.params.id = req.body.id
})

// 5. 
// DELETE /cart-items/:id 
// Action: Remove the item from the array that has the given ID.
// Response: Empty
// Response Code: 204 (No Content)

routes.delete('/cart-items/:id', (req, res) => {
    // get id you are targeting and delete from array
    const id = parseInt(req.params.id); // whole numbers

	// find the shop that matches this id
	const foundItem = cartItems.findIndex(looking => looking.id === id); // looking for one match

    cartItems.splice(foundItem, 1)

    res.status(204); //no content
    res.json();
})



// routes.get('/:name', (req,res) => {
//     // get the name
//     const name = req.params.name; // or req.params.id

//     const lastName = req.query.last; // pull ?last= query string

//     res.json("Hello, " + name + ' ' + lastName);
// })

export default routes;