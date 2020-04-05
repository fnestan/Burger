import "reflect-metadata" ;
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import {createConnection} from "typeorm";
import routes from './routes';

dotenv.config();

createConnection().then(async () => {
    const app: any = express();
    app.use("/", routes);
    app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
});

