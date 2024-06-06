module.exports=(sequelize,DataTypes)=>{
    const Product=sequelize.define("product",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        pname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },

    },{
        timestamps:false
    });
    return Product;
}