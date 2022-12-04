import ChatDiskusis from "../models/ChatDiskusiModel.js";
import Diskusis from "../models/DiskusiModel.js";
import Tags from "../models/TagsModel.js";
import Kebijakans from "../models/KebijakanModel.js";
import TagsKebijakans from "../models/Tags_KebijakanModels.js"; 
import TopicDiskusis from "../models/Topic_DiskusiModel.js";
import Topics from "../models/TopicModel.js";
import Users from "../models/UserModel.js";
import CommentKebijakans from "../models/CommentKebijakan.js";

// Chat Diskusi
ChatDiskusis.belongsTo(Diskusis,
    {
        foreignKey: 'diskusiId'
    }
);

Diskusis.hasMany(ChatDiskusis,
    {
        foreignKey: 'diskusiId'
    }
);

// Tags Kebijakan

Tags.belongsToMany(Kebijakans, {
    through: 'tags_kebijakan',
    as: 'kebijakan',
    foreignKey: 'tagsId',
    otherKey: 'kebijakanId',
})

Kebijakans.belongsToMany(Tags, {
    through: 'tags_kebijakan',
    as: 'tags',
    foreignKey: 'kebijakanId',
    otherKey: 'tagsId',
})

// Tags.hasMany(Kebijakans);
// Kebijakans.hasMany(Tags);

// TagsKebijakans.belongsTo(Kebijakans, {
//     as: 'kebijakan',
//     foreignKey: 'kebijakanId'
// })

// TagsKebijakans.belongsTo(Tags, {
//     as: 'tags',
//     foreignKey: 'tagsId'
// })

// Topic diskusi

Topics.belongsToMany(Diskusis, {
    through: 'topic_diskusi',
    as: 'diskusi',
    foreignKey: 'topicId',
    otherKey: 'diskusiId',
})

Diskusis.belongsToMany(Topics, {
    through: 'topic_diskusi',
    as: 'topics',
    foreignKey: 'diskusiId',
    otherKey: 'topicId',
})

// Users chatdiskusi
Users.hasMany(ChatDiskusis,
    {
        foreignKey: 'userId'
    }
);

ChatDiskusis.belongsTo(Users,
    {
        foreignKey: 'userId'
    }
);


// User Diskusi
Users.hasMany(Diskusis, 
    {
        foreignKey: 'userId'
    }
);
Diskusis.belongsTo(Users, 
    {
        foreignKey: 'userId'
    }
);


// Users Kebijakan
Users.hasMany(Kebijakans, 
    {
        foreignKey: 'userId'
    }
);
Kebijakans.belongsTo(Users, 
    {
        foreignKey: 'userId',
    }
);

// Comment kebijakan
CommentKebijakans.belongsTo(Kebijakans,
    {
        foreignKey: 'kebijakanId'
    }
);

Kebijakans.hasMany(CommentKebijakans,
    {
        foreignKey: 'kebijakanId'
    }
);


// Users comment kebijakan
Users.hasMany(CommentKebijakans,
    {
        foreignKey: 'userId'
    }
);

CommentKebijakans.belongsTo(Users,
    {
        foreignKey: 'userId'
    }
);

export { CommentKebijakans, ChatDiskusis, Diskusis, TopicDiskusis, Topics, Tags, TagsKebijakans, Kebijakans, Users};