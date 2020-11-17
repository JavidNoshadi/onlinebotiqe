const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://javid:javidity@cluster0.tgwq5.mongodb.net/botik", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
mongoose.Schema.Types.Boolean.convertToFalse.add('off');
mongoose.Schema.Types.Boolean.convertToTrue.add('on');
mongoose.set('debug',true)
module.exports = connectDB