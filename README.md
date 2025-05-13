# Virtual Wallet Project

This project simulates a virtual wallet system with two REST services: one for direct database access and another that acts as a client-facing API. The system allows users to register, load money into their wallets, make purchases, confirm payments, and check their wallet balances.

## Project Structure

The project is organized into three main directories:

- **client**: Contains the React application for user interaction.
- **service-db**: Contains the backend service that interacts directly with the MongoDB database.
- **service-client**: Acts as a bridge between the client application and the database service.

## Features

1. **User Registration**: Users can register by providing their document, names, email, and cell phone number.
2. **Load Wallet**: Users can load money into their wallets by providing their document, cell phone number, and the amount to load.
3. **Make Purchase**: Users can make a purchase, which generates a 6-digit confirmation token sent to their registered email.
4. **Confirm Payment**: Users can confirm their payment by providing the session ID and the token received via email.
5. **Check Balance**: Users can check their wallet balance by providing their document and cell phone number.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user and wallet information.
- **TypeScript**: Superset of JavaScript for type safety and better development experience.
- **React**: Frontend library for building user interfaces.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to each service directory and install dependencies:
   ```
   cd client
   npm install

   cd ../service-db
   npm install

   cd ../service-client
   npm install
   ```

3. Set up your MongoDB connection string in the environment variables as specified in the project.

## Running the Project

- Start the database service:
  ```
  cd service-db
  npm start
  ```

- Start the client service:
  ```
  cd service-client
  npm start
  ```

- Start the client application:
  ```
  cd client
  npm start
  ```

## API Documentation

Refer to the Postman collection included in the project for detailed API documentation and testing.

## Contribution

Feel free to contribute to this project by submitting issues or pull requests. 

## License

This project is licensed under the MIT License.
