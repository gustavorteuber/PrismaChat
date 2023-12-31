import { Request } from "express"

export default class ExpressRequestAdapter {
    request: any
    constructor(request: Request) {
        this.request = request
    }

    get body() {
        return this.request.body
    }

    get params() {
        return this.request.params
    }

    get query() {
        return this.request.query
    }
}