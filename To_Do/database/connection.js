const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL, {})
        console.log(`MongoDB connected : ${con.connection.host}`)
    }
    catch (err) {
        console.log(err)
        process.exit()
    }
}

module.exports = connectDB