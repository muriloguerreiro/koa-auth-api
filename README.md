# Koa Auth API

**Description:** This application is a user management system integrated with AWS Cognito for authentication. It allows registering, listing, and editing user data, with role-based access control.

## Features

- User registration with email and password.
- User authentication via AWS Cognito.
- Listing all registered users (admin access only).
- Editing authenticated user data.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side applications.
- **TypeScript**: Programming language that extends JavaScript with static typing.
- **Routing-Controllers**: Library to facilitate the use of controllers in Express applications.
- **AWS Cognito**: AWS service for user management and authentication.
- **TypeORM**: ORM for working with databases.
- **Koa**: Framework for building APIs.

## Requirements

Before running the application, make sure you have the following dependencies installed:

- Node.js (>= 14.x)
- NPM (or Yarn)
- Database (PostgreSQL, MySQL, etc.)

## Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/muriloguerreiro/koa-auth-api.git
   cd koa-auth-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables. Create a `.env` file in the root of the project and add the following variables:

   ```
   DB_HOST=db
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=koa-auth-api
   COGNITO_USER_POOL_ID=us-east-2_XXXXXXXXX
   COGNITO_APP_CLIENT_ID=XXXXXXXXXXXX
   COGNITO_REGION=us-east-2
   ```

## Running the Application

To start the server using Docker, run the following command:

```bash
docker-compose up --build
```

The server will be available at [http://localhost:3000](http://localhost:3000).


## Endpoints

### User SignIn or Register

- **Method:** `POST`
- **Route:** `/auth`
- **Request Body:**
  ```json
  {
      "email": "user@example.com",
      "password": "password123"
  }
  ```

### User Verification

- **Method:** `POST`
- **Route:** `/auth/confirm-user`
- **Request Body:**
  ```json
  {
      "email": "user@example.com",
      "confirmationCode": "123456"
  }
  ```

### List Users

- **Method:** `GET`
- **Route:** `/users`
- **Authentication:** Requires admin permissions.

### Edit Account

- **Method:** `PUT`
- **Route:** `/edit-account`
- **Authentication:** Requires user authentication.

- **Request Body:**
  ```json
  {
    "name": "New Name"
  }
  ```

## Contribution

Contributions are welcome! Feel free to open a pull request or issue.

## Contact

For questions, contact:

- **Name:** Murilo Guerreiro
- **Email:** guerreiro_murilo@hotmail.com