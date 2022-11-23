import { Sequelize } from "sequelize";
import db from "../config/db.js";

const {DataTypes} = Sequelize;
const Users = db.define('user',{
    uid:{ 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    username:{ 
        type: DataTypes.STRING, 
        allowNull: true,
        validate:{
            notEmpty: true,
            len: [1,255]
        }
    },
    nama:{ 
        type: DataTypes.STRING, 
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    },
    email:{ 
        type: DataTypes.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{ 
        type: DataTypes.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    alamat:{ 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    no_hp:{ 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    tgl_lahir:{ 
        type: DataTypes.DATE, 
        allowNull: true,
    },
    pendidikan:{ 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    foto:{ 
        type: DataTypes.BLOB, 
        allowNull: true,
    },
    nama_lembaga:{ 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    deskripsi_lembaga:{ 
        type: DataTypes.STRING, 
        allowNull: true,
    },
    role:{ 
        type: DataTypes.STRING, 
        allowNull: true,
    },

},{
    freezeTableName: true
})

export default Users;