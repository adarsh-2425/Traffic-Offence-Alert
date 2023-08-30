# Traffic Offence Alert System

The Traffic Offence Alert System is a web application that helps automate the process of notifying traffic violators about their violations, providing payment links, and generating receipts for paid fines.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Capture traffic violation details including violator's name, vehicle number, violation type, location, and fine amount.
- Generate payment links using Stripe Checkout to allow violators to pay their fines online.
- Automatically update the database and generate PDF receipts when fines are paid.
- Send SMS notifications to violators with violation details and payment links.
- Shorten payment links using the Bitly URL shortening service to improve readability.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Stripe API
- Bitly API
- Twilio API (for SMS notifications)
- PDFKit (for generating PDF receipts)
- Bootstrap (for frontend styling)
- HTML, CSS, JavaScript

## Screenshots

1. Filling the Violation Form:
   ![Screenshot 1](/screenshots/screenshot1.png)

2. SMS Notification of Violation:
   ![Screenshot 2](/screenshots/screenshot2.png)

3. Stripe Checkout Form for Payment:
   ![Screenshot 3](/screenshots/screenshot3.png)

4. SMS Confirmation and Receipt Download Link:
   ![Screenshot 4](/screenshots/screenshot4.png)

5. Payment Receipt:
   ![Screenshot 5](/screenshots/screenshot5.png)


## Getting Started

To run the Traffic Offence Alert System on your local machine, follow these steps:

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adarsh-2425/Traffic-Offence-Alert.git
   cd Traffic-Offence-Alert


2. Install the dependencies:

```bash
  npm install

```
## Usage

1. Add an .env file and  your environment variables into it. (e.g., Stripe API keys, Twilio credentials, MongoDB connection string, etc.).
  
2. Start the server:

   ```bash
    npm start
    
3. Access the application in your browser at http://localhost:3000.

## Contributing
Contributions are welcome! If you have any ideas or improvements, feel free to open an issue or create a pull request.

## License
This project is licensed under the MIT License.

Made with ❤️ by Adarsh