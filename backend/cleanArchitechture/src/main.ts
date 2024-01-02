import { MysqlDatabaseAdapter } from "./infra/database/MysqlDatabaseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/controllers/MainController";

export class App {
    private readonly ExpressAdapter = new ExpressAdapter
    private readonly MysqlAdapter = new MysqlDatabaseAdapter
    
    // routes

    readonly mainController = new MainController(this.ExpressAdapter, this.MysqlAdapter)

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