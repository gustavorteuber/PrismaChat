import { Response } from "express"
import { IExpressResponseAdapter } from "./IHttpResponse"

export default class ExpressResponseAdapter implements IExpressResponseAdapter {
    response: any
    constructor(response: Response) {
        this.response = response
    }

    json(data: any): void {
        this.response.json(data)
    }

    send(data: any): void {
        this.response.send(data)
    }

    status(code: number): void {
        this.response.status(code)
    }
}