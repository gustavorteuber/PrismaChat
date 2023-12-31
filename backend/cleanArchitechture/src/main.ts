import ExpressAdapter from "./infra/http/ExpressAdapter";

export class App {
    private readonly ExpressAdapter: ExpressAdapter
    constructor () {
        this.ExpressAdapter = new ExpressAdapter()
    }

    async start () {
        this.ExpressAdapter.listen(8888)
    }

    async stop () {
        this.ExpressAdapter.close()
    }
}

const app = new App()
app.start().catch(() => {
    console.log('Um ou mais serviços não iniciaram corretamente.')
})