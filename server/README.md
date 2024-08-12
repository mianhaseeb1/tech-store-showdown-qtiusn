# Techary Tech Store API

Welcome to the Techary Tech Store API! In this project, we will be building a server-side application using Node.js and a popular framework like Express or Koa. Our goal is to create a robust API that allows users to interact with a product catalog and place orders.

To get started, we will define a Product model with essential fields such as name, price, and description. This model will serve as the foundation for our API endpoints. We will implement an endpoint to fetch all products, providing a comprehensive list of available items. Additionally, we will create an endpoint to fetch details for a specific product, allowing users to view specific information about a particular item.


## Task to be completed

- Using Node.js and any popular framework (Express, Koa, etc), create a Product model with the following fields: name, price, description.
- Implement an API endpoint to fetch all products. The response should include all fields from the Product model.
- Implement an API endpoint to fetch details for a specific product, including all fields from the Product model.
- Implement an API endpoint to create a new order. The request should include an array of products (with their quantities) and shipping details.

## Prerequisites

To run this project, you'll need Node.js installed on your system. The project uses Node.js version `21.7.3`. You can manage multiple versions of Node.js on your machine with [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm).

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone http://techary-limit-ozsskh@git.codesubmit.io/techary-limited/tech-store-showdown-qtiusn
   cd tech-store-showdown-qtiusn/server
   ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**
Create a .env file in the root directory and fill it with the necessary environment variables.

4. **Start the server:**

    - For Development environment:

        ```bash
        npm run start:dev
        ```

    - For qa environment:

        ```bash
        npm run start:staging
        ```

    - For productoon environment:

        ```bash
        npm run start:prod
        ```

5. **Linting:**

    - ESLint is configured for linting.

    - To check for linting errors:

        ```bash
        npm run eslint
        ```

    - To automatically fix linting errors:

        ```bash
        npm run eslint-fix
        ```
