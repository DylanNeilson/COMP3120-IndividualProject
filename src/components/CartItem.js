// Create a functional component named 'CartItem' that accepts props
const CartItem = (props) => {
    // Define a function 'handleDelete' to handle item removal
    const handleDelete = () => {
        // Call the 'onDelete' function passed as a prop with the 'index' prop as an argument
        props.onDelete(props.index);
    };

    // Render the component
    return (
        <tbody>
            <tr>
                <td>{props.title}</td>
                <td>{props.quantity}</td>
                <td>${props.total}</td>
                <td>
                    <button class="button" type="button" onClick={handleDelete}>
                        Remove
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default CartItem;
