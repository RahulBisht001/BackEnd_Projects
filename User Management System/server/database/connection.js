const mongoose = require('mongoose')

/* 
I don't Know what is this Error I Search it on Stack overflow 
and the below line was given as the ans .
It also require to  comment down the data inside try  box
*/

mongoose.set('strictQuery', true)

const connectDB = async () => {
    try {
        // MongoDB connection String
        const con = await mongoose.connect(process.env.MONGO_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        })
        console.log(`MongoDB Connected : ${con.connection.host}`)
    }
    catch (err) {
        console.log(err)
        process.exit()
    }
}

module.exports = connectDB