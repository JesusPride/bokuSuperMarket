const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const productRoute = require('./Routes/ProductRoute');
const userRoute = require('./Routes/UserRoutes');

dotenv.config();

const app = express();  
app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/products', productRoute); 
app.use('/users', userRoute); 

connectDB(); // Connect to the database

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
 