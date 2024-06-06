const Sequelize=require('sequelize');
const config=require("./db.config");
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const sequelize=new Sequelize(config.db,config.user,config.password,
    {host:config.host,dialect:config.dialect});

const db={
    sequelize:sequelize,
    Sequelize:Sequelize,
    users:require("../src/models/user.model")(sequelize,Sequelize),
    products:require("../src/models/product.model")(sequelize,Sequelize),
    merchants:require("../src/models/merchant.model")(sequelize,Sequelize)
}
db.users.belongsToMany(db.products,{through:"user_product"});
db.products.belongsToMany(db.users,{through:"user_product"})
db.merchants.hasMany(db.products,{as:"products",onDelete:"cascade",onUpdate:"cascade"});
db.products.belongsTo(db.merchants,{as:"merchant"})
module.exports=db