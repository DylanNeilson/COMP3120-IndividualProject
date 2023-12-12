// Import modules and components
import Orders from "./Orders";
import Home from "./Home";
import Cart from "./Cart";
import ProductPage from "./ProductPage";
import OrderPage from "./OrderPage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Define CSS styles as an object
const styles = {
    nav: {
        paddingTop: "10px",
        position: "relative",
        marginLeft: "-60px",
    },

    li: {
        display: "inline",
        padding: "20px",
    },

    Link: {
        textDecoration: "none",
        color: "black",
    },

    ul: {
        listStyleType: "none",
    },
    userLogin: {
        position: "absolute",
        right: "0px",
        margin: "-20px 0px 0px 0px",
    },
};

// Create a functional component named 'Navigation'
const Navigation = () => {
    // Define state variables and their corresponding setter functions
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const userID = 1;

    // Use the useEffect hook to communicate with the express server
    useEffect(() => {
        axios
            // .get("http://localhost:3001/users/" + userID)
            .get(
                "https://comp3120assignment1dylanneilson.onrender.com/users/" +
                    userID
            )
            .then((response) => {
                console.log("we have a response", response);
                setUsers(response.data); // Update the 'users' state with data from the express server JSON
            });
    }, []);

    console.log("Rendering the App component");

    // Render the component
    return (
        <Router>
            <nav style={styles.nav}>
                <ul style={styles.ul}>
                    <li style={styles.li}>
                        <Link to="/" style={styles.Link}>
                            Home
                        </Link>
                    </li>
                    <li style={styles.li}>
                        <Link to="/cart" style={styles.Link}>
                            Cart
                        </Link>
                    </li>
                    <li style={styles.li}>
                        <Link to="/orders" style={styles.Link}>
                            Orders
                        </Link>
                    </li>
                    <li style={(styles.li, styles.userLogin)}>
                        Logged in as {users.first_name}
                    </li>
                </ul>
            </nav>
            <hr></hr>
            <Routes>
                <Route
                    path="*"
                    element={
                        <Home products={products} setProducts={setProducts} />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Cart
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                        />
                    }
                />
                <Route
                    path="/orders"
                    element={<Orders orders={orders} setOrders={setOrders} />}
                />
                <Route
                    path="products/:id"
                    element={
                        <ProductPage
                            products={products}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                        />
                    }
                />
                <Route
                    path="orders/:id"
                    element={<OrderPage orders={orders} />}
                />
            </Routes>
        </Router>
    );
};

export default Navigation;
