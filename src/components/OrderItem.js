// Import modules and components
import axios from "axios";
import { Link } from "react-router-dom";

// Create a functional component named 'OrderItem' that accepts props
const OrderItem = (props) => {
    // Define a function 'handleDeleteOrder' to handle order deletion
    const handleDeleteOrder = () => {
        // Create an 'orderToDelete' object with the order ID to be deleted
        const orderToDelete = {
            id: props.id,
        };

        // Make a DELETE request to delete the order
        axios
            // .delete("http://localhost:3001/orders", { data: orderToDelete })
            .delete(
                "https://comp3120assignment1dylanneilson.onrender.com/orders",
                {
                    data: orderToDelete,
                }
            )
            .then((response) => {
                console.log("Delete response", response.data);
            })
            .catch((error) => {
                console.error("Error deleting order", error);
            });
        // Create a new array to filter out the deleted order
        let newOrdersArray = [];
        props.orders.map((order) => {
            if (order.id !== props.id) {
                newOrdersArray.push(order);
            }
        });
        // Update the array with the new filtered array
        props.setOrders(newOrdersArray);
    };
    // Render the component
    return (
        <tbody>
            <tr>
                <td>{props.order_date}</td>
                <td>{props.order_status}</td>
                <td>${props.order_total}</td>
                <td>
                    <Link to={`/orders/${props.id}`} class="button">
                        View
                    </Link>
                </td>
                <td>
                    <button
                        class="button"
                        type="button"
                        onClick={handleDeleteOrder}
                    >
                        Cancel
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default OrderItem;
