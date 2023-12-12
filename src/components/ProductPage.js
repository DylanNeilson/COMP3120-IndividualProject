// Import modules and components
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// Define CSS styles as an object
const styles = {
    productContainer: {
        display: "flex",
        flexDirection: "row",
    },
    image: {
        width: "500px",
        borderRadius: "20px",
    },
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        width: "400px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        marginTop: "10px",
        marginBottom: "20px",
    },
};

// Create a functional component named 'ProductPage' that accepts props
const ProductPage = ({ setCartItems, cartItems, products }) => {
    // Initialize the 'quantity' state variable with a default value of 0
    const [quantity, setQuantity] = useState(0);
    // Retrieve the 'id' parameter from the URL using 'useParams'
    const { id } = useParams();
    // Find the corresponding product in the 'products' array
    const product = products.find((p) => p.id === id);
    // If the product is not found, display a message
    if (!product) {
        return <div>Product not found</div>;
    }
    // Handle changes in quantity input field
    const handleCartChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === "quantity") {
            setQuantity(value);
        }
    };
    // Add the selected product to the cart
    const addToCart = (event) => {
        event.preventDefault();
        const cartObject = {
            product: product,
            quantity: quantity,
        };
        // Update the 'cartItems' state with the new cart object
        setCartItems((prevCartItems) => [...prevCartItems, cartObject]);
        console.log(cartItems);
    };
    // Render the component
    return (
        <div class="pageBody">
            <div class="pageContainer">
                <h1>{product.title}</h1>

                <div class="pageContents">
                    <div style={styles.productContainer}>
                        <img
                            src={product.image}
                            style={styles.image}
                            alt="product image"
                        ></img>
                        <div style={styles.infoContainer}>
                            <p>{product.body}</p>
                            <form style={styles.form} onSubmit={addToCart}>
                                <label>Qty:</label>
                                <input
                                    style={styles.input}
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={handleCartChange}
                                ></input>
                                <button class="button" type="submit">
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductPage;
