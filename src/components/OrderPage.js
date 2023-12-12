// Import modules and components
import { useParams } from "react-router-dom";

// Create a functional component named 'OrderPage' that receives props
const OrderPage = ({ orders }) => {
    // Retrieve the 'id' parameter from the URL using 'useParams'
    const { id } = useParams();
    // Convert the 'id' parameter to a number
    const orderId = parseInt(id, 10);
    // Find the corresponding order in the 'orders' array
    const order = orders.find((o) => o.id === orderId);

    // If the order is not found, display a message
    if (!order) {
        return <div>Order not found</div>;
    }
    // Render the component
    return (
        <div class="pageBody">
            <div class="pageContainer">
                <h1>Order #{order.id}</h1>
                <div class="pageContents"></div>
                <p>Date: {order.order_date}</p>
                <p>Status: {order.order_status}</p>
                <p>Total: ${order.order_total}</p>
            </div>
        </div>
    );
};
export default OrderPage;
