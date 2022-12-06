import express  from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./src/config/db.js";
import router from "./src/routes/routes.js"
import SequelizeStore from "connect-session-sequelize";
import fileUpload from "express-fileupload";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const storedb = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: storedb,
    cookie: {
        secure: 'auto'
    }
}));

const sync = async () => {
    await db.sync({ force: false });
}
sync();

// app.use(cors({
//     credentials: true,
//     origin: ['*'], 
// }));

app.use(cors());

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(router);

storedb.sync();

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`server up and running in port ${process.env.PORT} .....` );
});