import {InferAttributes, Model,InferCreationAttributes, CreationOptional} from 'sequelize';
import sequelize from './sequelize';

class Hotel extends Model<InferAttributes<Hotel>,InferCreationAttributes<Hotel>>{
    declare id:CreationOptional<number>;
    declare name:string;
    declare address:string;
    declare location:string;
    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
    declare deletedAt:CreationOptional<Date | null>;
    declare rating?:number;
    declare ratingCount?:number;
}

// rules on the ts layer is written here.

Hotel.init({
    id:{
        type:"INTEGER",
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:"STRING",
        allowNull:false,
    },
    address:{
        type:"STRING",
        allowNull:false,
    },
    location:{
        type:"STRING",
        allowNull:false,
    },
    createdAt:{
        type:"DATE",
        defaultValue:new Date(),
    },
    updatedAt:{
        type:"DATE",
        defaultValue:new Date(),
    },
    deletedAt:{
        type:"DATE",
        defaultValue:null,
    },
    rating:{
        type:"FLOAT",
        defaultValue:null,
    },
    ratingCount:{
        type:"INTEGER",
        defaultValue:null
    }
},
{
    tableName:"hotels",    // name of the databse in mysql -> hotels        this is mapping the db
    sequelize:sequelize,  // name of the orm used
    underscored:true,  // createdAt -> created_at
    timestamps:true,   // createAt,updatedAt
});


export default Hotel;