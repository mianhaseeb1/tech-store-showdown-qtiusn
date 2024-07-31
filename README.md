
## Objective

Your task is to create a full-stack application for an e-commerce IT store. The application will allow users to browse products, add them to a cart, and proceed to checkout.

## Brief

This challenge is split into two main sections: front-end and back-end development.

### Front-end development

Task 1: Create a responsive user interface for the IT store using any popular JavaScript framework (React, Vue, Angular, etc)
- Implement a home page displaying a list of products. Each product should display its name, price, and a "Add to Cart" button.
- Implement a product details page displaying the product's details, including its name, price, description, and an "Add to Cart" button.
- Implement a cart page showing all the products added to the cart, with their quantities. The page should also display the total price of all items in the cart.
- Implement a checkout page that displays a form for shipping details. The form should include fields for name, email, address, and phone number.

Task 2: Implement front-end logic
- Create a service to interact with the API. The service should include methods to get all products, get a specific product, add a product to the cart, get all products in the cart, and checkout.
- Handle loading and error states for all API operations. Show a loading spinner when waiting for a response and display an error message if the operation fails.
- Store the cart in local storage so that the user's cart persists across sessions.
- Validate user input on the checkout form before submitting the order.

### Back-end Development

Task 3: Implement back-end logic
- Using Node.js and any popular framework (Express, Koa, etc), create a Product model with the following fields: name, price, description.
- Implement an API endpoint to fetch all products. The response should include all fields from the Product model.
- Implement an API endpoint to fetch details for a specific product, including all fields from the Product model.
- Implement an API endpoint to create a new order. The request should include an array of products (with their quantities) and shipping details.

### Evaluation Criteria

- Code quality and organization
- Completeness of the solution
- UI/UX design quality
- Efficiency of algorithms
- Security practices
- Testing strategies
- Documentation quality

### CodeSubmit 

Please organize, design, test, and document your code as if it were going into production, then push your changes to the master branch. 

Have fun coding! 🚀

The Techary Limited Team

