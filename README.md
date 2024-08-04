React-Final-Project
===================

Project Documentation
---------------------

### Table of Contents

1.  Client Side
    *   Description
    *   Setup
    *   Implementations
2.  Admin Side
    *   Description
    *   Setup
    *   Implementations
3.  Server Side
    *   Description
    *   Setup
    *   Implementations

Introduction
------------

This project is an e-commerce platform designed to offer a diverse range of clothing for all demographics—women, men, and children. Users can browse various product categories, view detailed information in the "About" section, log in to their accounts, and manage their shopping carts. Once authenticated, users unlock additional features for a more personalized shopping experience. Additionally, the website includes an Admin panel that is accessible exclusively to administrators. Once logged in, admins have the ability to create, update, delete, and preview products. The server side handles all API requests and manages database operations. The platform is equipped to handle both client-side and server-side errors gracefully, ensuring that users are promptly informed and guided through any issues that arise.

Technologies Used
-----------------

*   **Frontend:** React JS, CSS
*   **Backend:** Node.js, Express
*   **Database:** MongoDB
*   **Authentication:** JWT (JSON Web Token)
*   **Other:** Multer, react-router-dom

Client Side Documentation
-------------------------

#### Description

The client-side is the primary interface for customers, designed to facilitate an engaging shopping experience. Both logged-in and guest users can browse products, but only authenticated users can access detailed product information and manage their shopping cart.

#### Setup

The app is built using the React framework.

#### Implementations

The client-side incorporates the following features:

*   User authentication with Sign Up and Login
*   REST API requests for dynamic data interaction
*   Context API for managing shared resources
*   Routing for seamless navigation between pages
*   Comprehensive error handling and validation

Admin Side Documentation
------------------------

#### Description

The admin-side is the endpoint for managing product details. The Admin Panel allows authenticated administrators to create new products, update existing product details, remove products, and preview all products in stock.

#### Setup

The app is built using the React framework.

#### Implementations

The admin-side incorporates the following features:

*   Admin Login authentication
*   CRUD operations via REST API requests
*   Context API functionallity
*   Error handling and validation

Server Side Documentation
-------------------------

#### Description

The server side of the project is built using the Express framework and is responsible for database connectivity with MongoDB. The Multer module enables image uploads for product management. Server-side logic includes client and admin authentication using JWT, admin CRUD operations for products, and shopping cart functionality for authenticated users.

#### Setup

The server is built using Node.js and Express

#### Implementations

The admin-side incorporates the following features:

*   Database connectivity with MongoDB
*   Authentication via JWT
*   Image upload functionality using the Multer module
*   Robust error handling and validation

Setup Project locally
---------------------

### Client/Admin Side Setup

1.  Clone the git repository
2.  Navigate to the client/admin directory
3.  Run `npm install` or `npm i` to install node\_modules dependencies
4.  Run `npm run dev` to launch the cleint/admin side
5.  Go to http://localhost:5173/ to preview app

### Server Side Setup

1.  Clone the repository
2.  Navigate to the server directory
3.  Run `npm install` or `npm i` to install node\_modules dependencies
4.  Set up environment variables for database connection and JWT secret
5.  Run `node server.js` to launch the server
6.  If everything is setup properly you should see **_Server running on port 3030_** and should be able to go to http://localhost:3030/