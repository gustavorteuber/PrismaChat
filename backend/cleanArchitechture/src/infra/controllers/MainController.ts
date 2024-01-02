import { IDatabase } from "../database/IDatabase";
import { IHttpServer } from "../http/IHttpServer";
import AuthController from "./AuthController";

export default class MainController {
    constructor(readonly httpServer: IHttpServer, readonly database: IDatabase) {
        new AuthController(this.httpServer, this.database)
    }
}