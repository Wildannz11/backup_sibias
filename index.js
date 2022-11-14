import express  from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./src/config/db.js";
import router from "./src/routes/routes.js"
dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

// (async()=>{
//     await db.sync();
// })();

const sync = async()=>{
    await db.sync();
}
sync();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:8000','http://localhost:9000','http://localhost:3000'] 
}));

app.use(express.json());
app.use(router)

app.listen(process.env.APP_PORT, () =>{
    console.log(`server up and running in port ${process.env.APP_PORT} .....` );
});