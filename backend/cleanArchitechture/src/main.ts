import { MysqlDatabaseAdapter } from "./infra/database/MysqlDatabaseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";

export class App {
    private readonly ExpressAdapter: ExpressAdapter
    private readonly MysqlAdapter: MysqlDatabaseAdapter

    constructor () {
        this.ExpressAdapter = new ExpressAdapter()
        this.MysqlAdapter = new MysqlDatabaseAdapter()
    }

    async start () {
        this.ExpressAdapter.listen(8888)
        await this.MysqlAdapter.connect()
    }

    async stop () {
        this.ExpressAdapter.close()
        await this.MysqlAdapter.disconnect()
    }
}

const app = new App()
app.start().catch(() => {
    console.log('Um ou mais serviços não iniciaram corretamente.')
})