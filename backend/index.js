const express = require('express')
const app = express()
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config()
const port = process.env.PORT || 5000;


//middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))

const bookRoutes = require('./src/routes/book.route');
const orderRoutes = require('./src/routes/order.route')
const userRoutes = require('./src/routes/user.route')
const adminRoutes = require('./src/routes/admin.route')

//routes
app.use('/api/v1/books', bookRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/admin', adminRoutes)

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    app.use("/", (req, res) => {
        res.send("Book store server is running....")
    })
}

main().then(() => console.log("MongoDb connected Successfully")).catch(err => console.error(err));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})