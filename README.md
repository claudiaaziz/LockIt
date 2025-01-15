# Lockit - Password Manager

A secure password management application with Google OAuth authentication and end-to-end encryption.
![Lockit](./client/public/lockit.png)

## Features

### Security

-   End-to-end encryption using AES-256-CTR
-   Google OAuth 2.0 authentication
-   JWT-based session management with HTTP-only cookies
-   CSRF protection
-   Rate limiting for API endpoints
-   Password strength validation

### User Experience

-   Modern dark theme UI with Material Design
-   Real-time password strength feedback
-   Password categorization (Social, Finance, Work, Personal)
-   Quick copy-to-clipboard functionality
-   Search and filter passwords
-   Responsive design for all devices

## Tech Stack

### Frontend

-   React 18
-   Material-UI v6
-   Context API for state management
-   React Router v6
-   Axios for API requests
-   React Hot Toast for notifications

### Backend

-   Node.js & Express
-   MySQL with connection pooling
-   MVC architecture
-   RESTful API design
-   JWT for authentication
-   Crypto for encryption/decryption

### Database

-   MySQL (hosted on Railway)
-   Secure credential storage
-   Efficient query optimization

## Security Measures

-   HTTP-only cookies for JWT storage
-   CSRF token validation
-   Rate limiting on sensitive endpoints
-   Password encryption before storage
-   Secure session management
-   Input validation and sanitization

## API Endpoints

### Authentication

-   `GET /auth/url` - Get Google OAuth URL
-   `GET /auth/token` - Handle OAuth callback
-   `GET /auth/logged_in` - Check login status
-   `POST /auth/logout` - Logout user

### Passwords

-   `GET /passwords` - Get all of the current user's passwords
-   `POST /passwords` - Create new password
-   `PUT /passwords/:id` - Update password
-   `DELETE /passwords/:id` - Delete password
-   `GET /passwords/decrypt/:id` - Decrypt specific password

## Deployment

-   Database: Railway (MySQL)
-   Backend: [Pending] AWS/GCP
-   Frontend: [Pending] AWS/GCP

## Local Development

1. Clone the repository

    ```bash
    git clone https://github.com/claudiaaziz/LockIt.git
    ```

2. Install dependencies

    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd client
    npm install
    ```

3. Set up environment variables

    ```bash
    # Server (.env)
    GOOGLE_CLIENT_ID=your_client_id
    GOOGLE_CLIENT_SECRET=your_client_secret
    DATABASE_URL=your_railway_db_url
    TOKEN_SECRET=your_jwt_secret
    ```

4. Start development servers

    ```bash
    # Start backend (port 5001)
    cd server
    npm start

    # Start frontend (port 3000)
    cd client
    npm start
    ```

## Future Enhancements

-   Two-factor authentication
-   Password generation
-   Browser extension
-   Mobile app version
