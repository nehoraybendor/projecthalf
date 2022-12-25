const indexR = require("./index");
const usersR = require("./users");
const gamesR = require("./games");
//const categoriesR = require("./categories");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/games",gamesR);
  //app.use("/categories",categoriesR);

  app.use("*",(req,res) => {
  res.status(404).json({msg:"endpoint not found , 404",error:404})
  })
}