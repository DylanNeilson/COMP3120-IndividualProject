// Import modules and components
import CartItem from "./CartItem";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Define CSS styles as an object
const styles = {
    cartTable: {
        width: "600px",
        textAlign: "left",
        marginBottom: "20px",
    },
    cartTableHeader: {
        width: "100px",
        textAlign: "left",
    },
};

// Create a functional component named 'Cart' that accepts props
const Cart = ({ cartItems, setCartItems }) => {
    // Define a state variable 'orders' and a function 'setOrders' to update it
    const [orders, setOrders] = useState([]);
    // Use the useEffect hook to communicate with the express server
    useEffect(() => {
        axios
            // .get("http://localhost:3001/orders")
            .get("https://comp3120assignment1dylanneilson.onrender.com/orders")
            .then((response) => {
                console.log("we have a response", response);
                setOrders(response.data);
            });
    }, []);

    // Define a function 'handlePlaceOrder' to handle placing an order
    const handlePlaceOrder = () => {
        // Get the current date in ISO format
        const orderDate = new Date().toISOString().split("T")[0];

        let total = 0;
        // Calculate the total cost of items in the cart
        cartItems.map((item) => {
            total = total + item.quantity * item.product.price;
        });

        // Create an 'order' object, containing order details
        let order = {
            id: 0,
            user_id: 1,
            order_date: orderDate,
            order_status: "pending",
            order_total: total,
            order_items: cartItems.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
            })),
        };
        // Determine the order ID based on existing orders
        if (orders.length === 0) {
            order.id = 9000;
        } else {
            order.id = orders[orders.length - 1].id + 1;
        }

        // Make a POST request to place the order
        axios
            // .post("http://localhost:3001/orders", order)
            .post(
                "https://comp3120assignment1dylanneilson.onrender.com/orders",
                order
            )
            .then((response) => {
                console.log("Order placed:", response.data);
                setCartItems([]); // Clear the cart after placing the order
            })
            .catch((error) => {
                console.error("Error placing order:", error);
            });
    };

    // Define a function 'handleDeleteItem' to remove an item from the cart
    const handleDeleteItem = (index) => {
        setCartItems((prevCartItems) => {
            const newCartItems = [...prevCartItems];
            newCartItems.splice(index, 1);
            return newCartItems;
        });
    };
    // Render the component
    return (
        <div class="pageBody">
            <div class="pageContainer">
                <h1>Cart</h1>
                <div class="pageContents">
                    <table style={styles.cartTable}>
                        <thead>
                            <tr>
                                <th style={styles.cartTableHeader}>Product</th>
                                <th style={styles.cartTableHeader}>Quantity</th>
                                <th style={styles.cartTableHeader}>Total</th>
                                <th style={styles.cartTableHeader}> </th>
                            </tr>
                        </thead>
                        {cartItems.map((item, index) => (
                            <CartItem
                                key={index}
                                index={index}
                                product_id={item.product.product_id}
                                title={item.product.title}
                                quantity={item.quantity}
                                total={item.product.price * item.quantity}
                                onDelete={handleDeleteItem}
                            />
                        ))}
                    </table>
                </div>
                <button class="button" type="button" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
