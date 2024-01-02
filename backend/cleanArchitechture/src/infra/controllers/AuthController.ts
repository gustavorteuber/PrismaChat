import AuthRepository from "../../application/repositories/AuthRepository";
import { IDatabase } from "../database/IDatabase";
import { IExpressRequestAdapter } from "../http/IHttpRequest";
import { IExpressResponseAdapter } from "../http/IHttpResponse";
import { IHttpServer } from "../http/IHttpServer";

export default class AuthController {

    constructor(readonly httpServer: IHttpServer, readonly database: IDatabase) {
        const authRepository = new AuthRepository(this.database)
        
        httpServer.on('POST', '/signup', async (request: IExpressRequestAdapter, response: IExpressResponseAdapter) => {
            const { name, username, password, confirmPassword } = request.body

            const user = await authRepository.getUserByUsername(username)

            if(confirmPassword !== password) {
                return response.status(400)
            }

            if (user) {
                return response.status(400)
            }

            const newUser = await authRepository.save({ name, username, password })

            return response.status(201)
        })
    }
}