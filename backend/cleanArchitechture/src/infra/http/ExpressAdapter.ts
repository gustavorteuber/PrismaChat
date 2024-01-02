import { IHttpServer } from "./IHttpServer";
import express, {type Request, type Response, type NextFunction} from 'express'
export default class ExpressAdapter implements IHttpServer {
    app: any
    constructor() {
        this.app = express()
        this.app.use(express.json())
    }

    on (method: string, url: string, callback: (...args: any) => any): void {
        this.app[method](url, async (req: Request, res: Response, next: NextFunction) => {
          try {
            const output = await callback(req, res, next);
            res.json(output);
          } catch (error: any) {
            next(error);
          }
        });
      }
    
      listen (port: number): void {
        this.app.listen(port);
        console.log('Escutando a porta: ', port);
      }
    
    close() {
        this.app.close()
    }
}