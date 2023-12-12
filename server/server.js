// Import necessary modules
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { stringify } = require("querystring");

app.use(express.static("build"));

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Read data from a JSON file and initialize variables
const data = JSON.parse(fs.readFileSync("server/sampledata.json"));
const products = data.products;
// const orders = data.orders;
const users = data.users;

orders = JSON.parse(fs.readFileSync("server/sampledata.json")).orders;

// Define a route to handle the root endpoint ("/")
app.get("/", (request, response) => {
    response.send("<p>Hello world</p>");
});
// Define a route to retrieve the list of products ("/products")
app.get("/products", (_, response) => {
    response.send(products);
});
// Define a route to retrieve the list of orders ("/orders")
app.get("/orders", (_, response) => {
    response.send(orders);
});
// Define a route to retrieve the list of users ("/users")
app.get("/users", (_, response) => {
    response.send(users);
});

// Define a route to retrieve a specific user by ID ("/users/:id")
app.get("/users/:id", (request, response) => {
    const userId = parseInt(request.params.id);
    const user = users.find((user) => user.id === userId);

    if (user) {
        response.json(user);
    } else {
        response.status(404).json({ error: "User not found" });
    }
});

// Define a route to create a new order ("/orders")
app.post("/orders", (request, response) => {
    const order = request.body;
    const orderId =
        orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
    // Set properties for the new order
    order.id = orderId;
    order.order_date = new Date().toISOString().split("T")[0];
    order.order_status = "pending";

    console.log("Received order:", order);

    // Add the new order to the 'orders' array
    orders.push(order);

    // Write the updated data back to the JSON file
    fs.writeFileSync(
        "server/sampledata.json",
        JSON.stringify({ products, orders, users }, null, 2)
    );
    response.json(order);
});

// Define a route to delete an order ("/orders")
app.delete("/orders", (request, response) => {
    console.log(request.body);
    const id = request.body.id;
    let result = { status: "not found" };
    let newOrders = [];
    // Iterate through existing orders to find and remove the specified order
    orders.forEach((order) => {
        if (order.id === id) {
            result = { status: "success" };
        } else {
            newOrders.push(order);
        }
    });
    // Update the 'orders' array with the new order list
    orders = newOrders;

    console.log("Order Deleted");

    // Write the updated data back to the JSON file
    fs.writeFileSync(
        "server/sampledata.json",
        JSON.stringify({ products, orders, users }, null, 2)
    );
    response.json(result);
});

// Define the server's listening port
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server running on PORT,", PORT);
});
