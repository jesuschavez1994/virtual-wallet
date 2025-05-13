# Virtual Wallet Client Application

This document provides an overview of the Virtual Wallet client application, which serves as the user interface for interacting with the wallet services.

## Overview

The Virtual Wallet client allows users to perform various operations related to their virtual wallets, including:

- Registering a new client
- Loading money into the wallet
- Making purchases with a confirmation code
- Checking the wallet balance

## Project Structure

The client application is structured as follows:

```
client/
├── public/
│   └── index.html          # Main HTML entry point
├── src/
│   ├── App.tsx            # Main application component
│   ├── components/         # React components
│   │   └── WalletForm.tsx  # Component for wallet operations
│   └── services/           # API service functions
│       └── api.ts         # Functions to interact with the REST API
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Documentation for the client application
```

## Getting Started

To get started with the Virtual Wallet client application, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd virtual-wallet/client
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:8080` to access the application.

## API Integration

The client application communicates with the backend services through a REST API. The API endpoints allow for the following operations:

- **Register Client**: POST request to register a new client.
- **Load Wallet**: POST request to load money into the wallet.
- **Make Payment**: POST request to initiate a payment.
- **Check Balance**: GET request to retrieve the wallet balance.

## Contributing

Contributions to the Virtual Wallet project are welcome. Please follow the standard Git workflow for submitting changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.