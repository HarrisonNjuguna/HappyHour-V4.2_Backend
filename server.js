const express = require('express')
const dotenv = require ('dotenv')
const mongoose = require ('mongoose')
const bodyParser = require ('body-parser')
const app = express()
const port = 6002

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const shopRouter = require('./routes/shop')
const categoryRouter = require('./routes/category')
const drinkRouter = require('./routes/drink')

dotenv.config()

const admin = require('firebase-admin')
const serviceAccount = require('./ServiceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Db Connected')).catch((err) => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/category', categoryRouter);
app.use('/api/drink', drinkRouter);


app.listen(process.env.PORT || port, () => console.log(`Happyhour backend app listening on port ${process.env.PORT}!`))