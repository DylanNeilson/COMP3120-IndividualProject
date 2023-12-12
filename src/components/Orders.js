// Import modules and components
import OrderItem from "./OrderItem";
import axios from "axios";
import React, { useEffect } from "react";

// Define CSS styles as an object
const styles = {
    orderTable: {
        width: "600px",
        textAlign: "left",
    },
    orderTableHeader: {
        width: "100px",
        textAlign: "left",
    },
};

// Create a functional component named 'Orders' that accepts props
const Orders = ({ orders, setOrders }) => {
    // Use the useEffect hook to communicate with the express server
    useEffect(() => {
        axios
            // .get("http://localhost:3001/orders")
            .get("https://comp3120assignment1dylanneilson.onrender.com/orders")
            .then((response) => {
                console.log("we have a response", response);
                setOrders(response.data); // Update the 'orders' state with data from the express server JSON
            });
    }, []);

    // Render the component
    return (
        <div class="pageBody">
            <div class="pageContainer">
                <h1>Orders</h1>
                <div class="pageContents">
                    <table style={styles.orderTable}>
                        <thead>
                            <tr>
                                <th style={styles.orderTableHeader}>Date</th>
                                <th style={styles.orderTableHeader}>Status</th>
                                <th style={styles.orderTableHeader}>Total</th>
                                <th style={styles.orderTableHeader}> </th>
                                <th style={styles.orderTableHeader}> </th>
                            </tr>
                        </thead>
                        {orders.map((u) => (
                            <OrderItem
                                setOrders={setOrders}
                                orders={orders}
                                id={u.id}
                                order_date={u.order_date}
                                order_status={u.order_status}
                                order_total={u.order_total}
                            />
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
