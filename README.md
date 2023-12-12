Name: Dylan Neilson

Student ID: 47004029

# COMP3120 Online Store 2023

The project requirements are in [REQUIREMENTS.md](REQUIREMENTS.md)

## Installation

To get started with this project run:

```bash
npm install
```

to install all of the dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## About This Project

This project is an individual assignment for COMP3120 at Macquarie University. The aim of this task was to develop an online store using a combination of HTML, CSS, and the React JavaScript library. The web app is developed using these react components and are integrated with an express JS server. The features included are:

-   Navigation bar.
-   List of products (on home page).
-   Product page, where quantity can be chosen and added to the cart.
-   Shopping cart page, where items can be removed and orders can be placed.
-   Orders page, where placed ordered can be veiwed or cancelled.
-   The website also has the ability to change the user. (This has to be done through code though)

## Included Components

All developed components can be found in the 'components' folder. The project was structured this way to make readability and scalability significantly easier. This allows App.js to have very little code inside it, while all relevant code for each component is stored in its own file.

### Navigation.js

This component utilies react router to add single page navigation capabilities to the website. It's been styled with css to create a simple 'nav bar' at the top of the page where you can then direct between 'Home', 'Cart' and 'Orders', while also seeing the current user login. This is the first instance where communication with the express server is called, as the user ID needs to be retrieved from the JSON file to then display the name.

Along with this are some vital useState variables that are being decalred and shared between the 'page' components, as well as defining the various routes needed for navigation.

### Home.js

This is the page the website first displays, it makes a call to the server and sets a useState variable with the contents of products from the JSON file, These details are then used to structure a 'ProductItem' component which is then listed in a grid, displaying all products.

### Cart.js

This page is responsible for displaying items added to the cart and also placing the order, where it will then get sent to the orders page. It is achieved by communicating with the server, where a useState variable is set to the conents of the orders JSON. When the 'Place Order' button is pressed, an 'order' object is created, containing the contents and is then written to the JSON.

The objects shown in the cart are only stored locally. Deleting them is done by adjusting the useState variable.

### Orders.js

This page makes a request to the server to retrieve the orders from the JSON and uses the details to fill out a OrderItem object, which is then displayed on the page.

### ProductPage.js

This page displays the selected product from the home page. It grabs the product ID from the url and compares it to the JSON file which is also passed into the function. A quantity can be chosen and once "add to cart" is pressed, it is then added to the cartItems useState varaible.

### ProductItem.js

This is a simple component that displays each product in a 'Tile' format, which is displayed on the home page.

### CartItem.js

This component is the entry that is displayed on each row in the cart table, It also included a delete button, which removes it from the useState array.

### OrderItem.js

This component is the entry that is displayed on each row in the order table, It also included a delete button, which communicates with the server and deletes the entry from the JSON file.

## Express Server

The server can be started by running 'npm run server' and server.js and sampledata.json can both be found in the 'server' folder.

### Server.js

The server is currently configured with the following endpoints:

-   "/products"
-   "/orders"
-   "/users"
-   "/users/:id"

A post request has also been implemented, which allows orders to be written to the JSON file. The delete request allows orders to be removed from the JSON file.
