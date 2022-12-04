import { Sequelize } from "sequelize";
// import Diskusi from "./DiskusiModel.js";
// import Topic from "./TopicModel.js";
import db from "../config/db.js";

const {DataTypes} = Sequelize;

const TopicDiskusis = db.define('topic_diskusi',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    topicId: {
        type: DataTypes.STRING,
    },
    diskusiId: {
        type: DataTypes.STRING,
    },
},{
    freezeTableName: true
});

// Topic.belongsToMany(Diskusi, {
//     through: 'topic_diskusi',
//     as: 'topics',
//     foreignKey: 'topicId',
//     otherKey: 'diskusiId',
// })

// Diskusi.belongsToMany(Topic, {
//     through: 'topic_diskusi',
//     as: 'diskusi',
//     foreignKey: 'diskusiId',
//     otherKey: 'topicId',
// })

// TopicDiskusi.belongsTo(Topic,{
//     foreignKey: 'topicId'
// });

// TopicDiskusi.belongsTo(Diskusi,{
//     foreignKey: 'diskusiId'
// });


export default TopicDiskusis;