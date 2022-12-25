const {config} = require('../config/secret')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

  mongoose.set(`strictQuery`, false);

  await mongoose.connect(`mongodb+srv://${config.userDB}:${config.userPass}@nehoraystud.askpzwt.mongodb.net/hachiwork`);
  console.log("mongo connect nbd7 local")
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabledmongodb+srv://${config.userDB}:${config.userPass}@nehoraystud.askpzwt.mongodb.net/?retryWrites=true&w=majority
}

