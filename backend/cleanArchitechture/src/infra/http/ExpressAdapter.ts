import { IHttpServer } from "./IHttpServer";
import express, {type Request, type Response, type NextFunction} from 'express'
export default class ExpressAdapter implements IHttpServer {
    app: any
    constructor() {
        this.app = express()
        this.app.use(express.json())
    }

    listen(port: number) {
        this.app.listen(port)
        console.log(`Server listening on port ${port}`)
    }

    on (method: string, url: string, callback: (req: Request, res: Response, next: NextFunction) => void) {
        this.app[method](url, async (req: Request, res: Response, next: NextFunction) => {
            try {
                const output = await callback(req, res, next);
                res.json(output);
            } catch (error: any) {   
                next(error);
            }
        });
    }
    close() {
        this.app.close()
    }
}