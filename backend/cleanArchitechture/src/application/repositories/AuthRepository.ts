import User from "../../domain/User";
import { IDatabase } from "../../infra/database/IDatabase";

export default class AuthRepository {
    constructor(readonly database: IDatabase) {}

    async getUserByUsername(username: string) {
        const query = `
            SELECT * FROM users WHERE username = ?
        `
        const params = [username]

        const rows = await this.database.query(query, params)
        if (rows.length === 0) {
            return rows
        } else {
            throw new Error('Usuario já existe')
        }
    } 

    async save({ name, username, password }: User) {
        const query = `
            INSERT INTO users (name, username, password) VALUES (?, ?, ?)
        `
        const params = [name, username, password]

        const rows = await this.database.query(query, params)
        return rows
    }
}