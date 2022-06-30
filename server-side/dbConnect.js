const mongoose = require('mongoose')

mongoose.connect( MONGO_URI='mongodb+srv://newme:ouvrez777@cluster0.6snkb.mongodb.net/lance-net', {useNewUrlParser : true , useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))

connection.on('connected' , () => console.log('MongoDB Connected! Yay!'))