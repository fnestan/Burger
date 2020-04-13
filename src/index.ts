import "reflect-metadata";
import dotenv from "dotenv";
import express, {NextFunction, Request, Response} from "express";
import {createConnection} from "typeorm";
import routes from './routes';

dotenv.config();

createConnection().then(async () => {
    const app: any = express();
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use("/", routes);
    app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
});

