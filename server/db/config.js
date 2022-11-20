import mongoose from "mongoose";

const setupDb = (dbUrl) => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    };

    mongoose.connect(dbUrl,connectionParams);

    mongoose.connection.on('connected', () => {
        console.log('The Mongo Database has connected succesfully')
    })
    mongoose.connection.on('reconnected', () => {
        console.log('The Mongo Database has reconnected')
    })
    mongoose.connection.on('error', error => {
        console.log('The Mongo connection has faced an error', error)
        mongoose.disconnect()
    })
    mongoose.connection.on('disconnected', () => {
        console.log('The Mongo connection is disconnected')
    })
};

export default setupDb;