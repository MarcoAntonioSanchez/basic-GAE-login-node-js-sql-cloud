import app from "./app.js"; // Importing default app

app.listen(process.env.PORT); // Listening app in environment variable port
console.log(`server on port ${process.env.PORT}`); // Printing in console the server is up in environment variable port
