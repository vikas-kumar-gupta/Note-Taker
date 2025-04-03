# AutoPe Assessment Project

## Project Overview
This Simple Note-Taking Application with [Cat-Facts](https://catfact.ninja/fact) is a backend application built using Node.js and Express, designed as an assessment task for AutoPe Payment Solutions Ltd. The application follows a modular structure, using TypeScript for better type safety and scalability.

## Features
- Built with TypeScript for robust development.
- Uses Express.js as the server framework.
- Data validation using Joi.
- Integration with MongoDB using Mongoose for seamless database operations.
- Uses Axios for making HTTP requests.
- Environment configuration through dotenv.

## Project Structure
The application follows a clean architecture with separation between services, controllers, and models.

```
.
├── dist            # Compiled JavaScript files
├── src             # Source code written in TypeScript
├── .env            # Environment variables
├── package.json    # Project metadata and dependencies
└── README.md       # Project documentation
```

## Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB

## Installation
1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```
   NODE_ENV=local
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/autope-db
   ```

## Running the Application
### Local Environment
To start the application in the local environment, use:
```bash
npm run start:local
```

## Building the Project
To build the project using TypeScript:
```bash
npm run build
```

## Technologies Used
- **Node.js** - Backend framework
- **Express.js** - Server framework
- **TypeScript** - Type safety and scalable code
- **Axios** - HTTP client for API calls
- **Joi** - Data validation
- **MongoDB & Mongoose** - Database and object modeling
- **dotenv** - Environment variable management

## Author
- **Vikas Kumar Gupta**

## Acknowledgements
Special thanks to AutoPe Payment Solutions Ltd. for the opportunity to work on this assessment project.

