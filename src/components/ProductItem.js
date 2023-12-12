// Import modules and components
import { Link } from "react-router-dom";

// Define CSS styles as an object
const styles = {
    productTile: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        textAlign: "left",
        width: "350px",
        height: "360px",
    },

    productName: {
        display: "flex",
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "white",
        width: "250px",
    },
    productImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "10px 10px 0px 0px",
    },
    productDesc: {
        display: "flex",
        fontSize: "10px",
    },
};

// Create a functional component named 'ProductItem' that accepts props
const ProductItem = (props) => {
    // Render the component
    return (
        <div style={styles.productTile}>
            <p style={styles.productName}>{props.title}</p>
            <img
                style={styles.productImage}
                src={props.image}
                alt="product image"
            ></img>
            <Link to={`/products/${props.id}`} class="viewProductBtn">
                View
            </Link>
        </div>
    );
};

export default ProductItem;
