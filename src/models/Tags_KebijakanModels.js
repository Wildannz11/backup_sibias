import { Sequelize } from "sequelize";
// import Kebijakans from "./KebijakanModel.js";
// import Tags from "./TagsModel.js";
import db from "../config/db.js";

const {DataTypes} = Sequelize;

const TagsKebijakans = db.define('tags_kebijakan',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tagsId: {
        type: DataTypes.STRING,
    },
    kebijakanId: {
        type: DataTypes.STRING,
    },
},{
    freezeTableName: true
});

// TagsKebijakan.belongsTo(Tags,{
//     foreignKey: 'tagsId'
// });

// TagsKebijakan.belongsTo(Kebijakan,{
//     foreignKey: 'kebijakanId'
// });

// Tags.belongsToMany(Kebijakans, {
//     through: 'tags_kebijakan',
//     as: 'tags',
//     foreignKey: 'tagsId',
//     otherKey: 'kebijakanId',
// })

// Kebijakans.belongsToMany(Tags, {
//     through: 'tags_kebijakan',
//     as: 'kebijakan',
//     foreignKey: 'kebijakanId',
//     otherKey: 'tagsId',
// })


export default TagsKebijakans;