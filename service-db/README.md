# Virtual Wallet Service Database

This directory contains the implementation of the database service for the Virtual Wallet application. The service is responsible for managing user registrations, wallet operations, and interactions with the MongoDB database.

## Structure

- **src/**: Contains the source code for the service.
  - **app.ts**: Entry point for the application, sets up the Express server and connects to MongoDB.
  - **controllers/**: Contains the logic for handling requests.
    - **walletController.ts**: Manages wallet operations such as loading money, making payments, and checking balances.
    - **userController.ts**: Handles user registration and management.
  - **models/**: Defines the data models for MongoDB.
    - **User.ts**: Schema and methods for user data.
    - **Wallet.ts**: Schema and methods for wallet data.
  - **routes/**: Defines the API endpoints and links them to controllers.
    - **index.ts**: Main routing file for the service.
  - **services/**: Contains utility services.
    - **emailService.ts**: Functions for sending emails, including confirmation tokens.
  - **utils/**: Utility functions.
    - **tokenGenerator.ts**: Generates a 6-digit token for payment confirmation.

## Setup

1. **Environment Variables**: Ensure the following environment variables are set:
   - `PORT`: The port on which the service will run (default is 8080).
   - `MONGODB_ATLAS`: MongoDB connection string.
   - `SECRETORPRIVATEKEY`: Secret key for token generation.

2. **Install Dependencies**: Run `npm install` to install the required packages.

3. **Start the Service**: Use `npm start` to run the service.

## API Endpoints

The service exposes the following endpoints:

- **POST /register**: Register a new user.
- **POST /load**: Load money into the wallet.
- **POST /pay**: Make a payment from the wallet.
- **POST /confirm**: Confirm a payment using a token.
- **GET /balance**: Check the wallet balance.

## Testing

A Postman collection is available in the root directory to test the API endpoints. Ensure to import the collection and set the necessary environment variables before testing.

## License

This project is licensed under the MIT License.