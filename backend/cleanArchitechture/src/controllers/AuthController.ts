import { IHttpServer } from "../infra/http/IHttpServer";

export default class AuthController {
    constructor(readonly httpServer: IHttpServer) {
        
    }
}