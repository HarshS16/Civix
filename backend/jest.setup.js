const mongoose = require('mongoose');
const{MongoMemoryServer} = require('mongodb-memory-server');

let mongoServer;

beforeAll(async()=>{
    mongoServer=await MongoMemoryServer.create();
    const mongoUri=mongoServer.getUri();
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async()=>{
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () =>{
    //clean up the databse between tests
    const collections = mongoose.connection.collections;
    for(const key in collections){
        await collections[key].deleteMany({});
    }
});
    

module.exports = {
    mongoServer,
};