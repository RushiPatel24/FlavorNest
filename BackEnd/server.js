require('dotenv').config();
const app = require("./src/app");
const connectoDb = require("./src/config/database")

connectoDb();

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})