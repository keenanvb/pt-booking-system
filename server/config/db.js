const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`mongodb connected ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log('error connecting to db', error)
    }
}

module.exports = connectDB