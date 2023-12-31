import { Response } from "express"

export default class ExpressResponseAdapter {
    response: any
    constructor(response: Response) {
        this.response = response
    }

    json(data: any) {
        this.response.json(data)
    }

    send(data: any) {
        this.response.send(data)
    }
}