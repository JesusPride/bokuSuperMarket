const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const productRoute = require('./Routes/ProductRoute');

dotenv.config();
connectDB();

const app = express();  
app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoute);  

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
 