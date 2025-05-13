# Virtual Wallet Service Client

This service acts as a bridge between the client application and the database service for the virtual wallet system. It provides RESTful endpoints for user registration, wallet operations, and balance inquiries.

## Features

- **User Registration**: Allows clients to register with their document, names, email, and cell phone number.
- **Wallet Operations**: Supports loading money into the wallet, making purchases, and confirming payments.
- **Balance Inquiry**: Enables users to check their wallet balance.

## Project Structure

- **src/app.ts**: Entry point for the service, sets up the Express application and routing.
- **src/controllers**: Contains controllers for handling requests related to wallet and user operations.
  - **walletController.ts**: Manages wallet-related operations.
  - **userController.ts**: Manages user registration operations.
- **src/routes/index.ts**: Defines the routes for the service, linking controllers to specific endpoints.
- **src/utils/apiClient.ts**: Contains functions for making HTTP requests to the database service.

## Installation

1. Clone the repository.
2. Navigate to the `service-client` directory.
3. Install the dependencies using npm:

   ```
   npm install
   ```

## Usage

To start the service, run the following command:

```
npm start
```

The service will be available at `http://localhost:8080`.

## API Endpoints

- **POST /register**: Register a new user.
- **POST /load-money**: Load money into the user's wallet.
- **POST /pay**: Make a payment using the wallet.
- **POST /confirm-payment**: Confirm a payment using a session ID and token.
- **GET /balance**: Check the wallet balance.

## Testing

A Postman collection is provided in the root directory to test the API endpoints. Import the `postman_collection.json` file into Postman to get started.

## License

This project is licensed under the MIT License.