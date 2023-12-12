// Import modules and components
import ProductItem from "./ProductItem";
import React, { useEffect } from "react";
import axios from "axios";

// Create a functional component named 'Home' that accepts props
const Home = ({ products, setProducts }) => {
    // Use the useEffect hook to communicate with the express server
    useEffect(() => {
        axios
            // .get("http://localhost:3001/products")
            .get(
                "https://comp3120assignment1dylanneilson.onrender.com/products"
            )
            .then((response) => {
                console.log("we have a response", response);
                setProducts(response.data); // Update the 'products' state with data from the express server JSON
            });
    }, []);

    // Render the component
    return (
        <div class="pageBody">
            <div class="pageContainer">
                <h1>Home</h1>
                <div class="pageContents">
                    {products.map((p) => (
                        <ProductItem
                            id={p.id}
                            title={p.title}
                            image={p.image}
                            body={p.body}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
