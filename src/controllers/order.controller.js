const { where } = require('sequelize');
const db = require('../../config/db.connection');
// const ProductHandler = require('../../handlers/ProductHandler');
// const { UserNotFound } = require('../../handlers/UserNotFound');
const User = db.users;
const Product = db.products;


//---------------------------------------add product to user------------------------------------
