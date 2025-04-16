# Ride-To-Gather

## Overview
Ride-To-Gather is a React application that facilitates ride-sharing and vehicle management. The application is structured to support both user and admin functionalities, providing a seamless experience for managing rides and vehicles.

## Features
- User authentication with login and signup functionalities.
- Admin dashboard for managing users and rides.
- Private routes for secure access to user and admin sections.
- Responsive design with a user-friendly interface.

## Project Structure
```
Ride-To-Gather
├── src
│   ├── App.jsx                # Main application component with routing
│   ├── index.jsx              # Entry point for the React application
│   ├── components             # Contains all the React components
│   │   ├── Home.jsx           # Home page component for users
│   │   ├── About.jsx          # About page component
│   │   ├── NotFound.jsx       # 404 error page component
│   │   ├── Common             # Common components for user and admin
│   │   │   ├── WelcomeNavbar.jsx # Navigation bar for welcome page
│   │   │   ├── WelcomePage.jsx  # Welcome page component
│   │   │   ├── Login.jsx        # Login component
│   │   │   └── Signup.jsx       # Signup component
│   │   ├── User               # User-specific components
│   │   │   ├── LogOut.jsx      # Logout component
│   │   │   ├── ErrorPage.jsx   # Error page component
│   │   │   ├── AddVehicle.jsx   # Component for adding vehicles
│   │   │   ├── AddRide.jsx      # Component for adding rides
│   │   │   ├── Home.jsx         # User home page component
│   │   │   └── LogoutConfirmation.jsx # Logout confirmation component
│   │   ├── Admin              # Admin-specific components
│   │   │   ├── AdminHome.jsx   # Admin home component
│   │   │   ├── AdminSignup.jsx  # Admin signup component
│   │   │   ├── AdminNavbar.jsx  # Navigation bar for admin section
│   │   │   └── AddState.jsx     # Component for adding states
│   │   └── Hooks              # Custom hooks for routing
│   │       ├── PrivateUserRoutes.jsx # Private routes for users
│   │       └── PrivateAdminRoutes.jsx # Private routes for admins
│   ├── assets                 # Contains project assets
│   │   └── react.svg          # React logo
│   └── styles                 # Contains styles for the project
│       └── App.css            # Main stylesheet
├── package.json               # Project dependencies and scripts
├── vite.config.js             # Vite configuration file
└── README.md                  # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd Ride-To-Gather
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.