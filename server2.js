const express = require("express");
const app = express();

app.use(express.json());

// Dummy User
const user = {
    username: "admin",
    password: "1234"
};

let loggedIn = false;

// Products
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mouse", price: 800 },
    { id: 3, name: "Keyboard", price: 1500 }
];

// Cart
let cart = [];

// Home
app.get("/", (req, res) => {
    res.send("E-Commerce Cart API");
});

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        loggedIn = true;
        return res.json({ message: "Login Successful" });
    }

    res.status(401).json({ message: "Invalid Credentials" });
});

// Logout
app.post("/logout", (req, res) => {
    loggedIn = false;
    res.json({ message: "Logged Out" });
});

// View Products
app.get("/products", (req, res) => {
    res.json(products);
});

// Add to Cart
app.post("/cart/:id", (req, res) => {
    if (!loggedIn)
        return res.status(401).json({ message: "Please Login First" });

    const product = products.find(p => p.id == req.params.id);

    if (!product)
        return res.status(404).json({ message: "Product Not Found" });

    cart.push(product);

    res.json({
        message: "Added to Cart",
        cart
    });
});

// View Cart
app.get("/cart", (req, res) => {
    if (!loggedIn)
        return res.status(401).json({ message: "Please Login First" });

    res.json(cart);
});

// Remove from Cart
app.delete("/cart/:id", (req, res) => {
    if (!loggedIn)
        return res.status(401).json({ message: "Please Login First" });

    const index = cart.findIndex(p => p.id == req.params.id);

    if (index === -1)
        return res.status(404).json({ message: "Item Not Found" });

    cart.splice(index, 1);

    res.json({
        message: "Removed from Cart",
        cart
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
