# Quote Generator App

The Quote Generator App is a simple web application that allows users to generate random quotes and add their own quotes. It features a clean and responsive design, making it easy to use on both desktop and mobile devices.

## Features

- **Generate Random Quotes**: Fetches random quotes from the server and displays them on the screen.
- **Add Your Own Quotes**: Users can add their own quotes along with the author's name.
- **Responsive Design**: The app is fully responsive and works seamlessly on all screen sizes.

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- Axios (for making HTTP requests)

### Backend
- Node.js
- Express.js
- MongoDB (for storing quotes)

## Usage

- Click the **Generate a Quote** button to fetch and display a random quote.
- Click the **Add Quote** button to add your own quote. Fill in the quote and author fields, then click **Submit Quote**.
- A success message will be displayed after adding a quote.

## Folder Structure

```
quote-generator/
├── backend/
│   ├── controllers/       # Backend controllers for handling requests
│   ├── db/                # Database connection and models
│   ├── errors/            # Custom error handling
│   ├── middleware/        # Middleware for authentication and error handling
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point for the backend server
├── frontend/
│   ├── static/            # Frontend static files (HTML, CSS, JS)
├── README.md              # Project documentation
```

## API Documentation

For detailed API documentation, visit: [API Docs](https://eediallo-qoute-server.hosting.codeyourfuture.io/api-docs/)

## Note on Authentication

While the codebase includes some files and middleware related to authentication, such as `auth.js` in the `controllers` and `middleware` directories, authentication is not yet implemented in the application. Future updates may include this feature.
