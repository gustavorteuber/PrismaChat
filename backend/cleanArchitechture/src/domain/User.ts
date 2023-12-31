import { hash } from 'bcrypt'
import { randomUUID } from 'crypto'

export default class User {
  constructor(
    public name: string,
    public username: string,
    public password: string,
    public confirmPassword?: string,
    public id?: string,
  ) {
    this.name = name
    this.username = username
    this.password = password
    this.confirmPassword = confirmPassword
    this.id = id ?? randomUUID()
  }

  static async create({ name, username, password, confirmPassword }: User) {
    const hashPassword = await hash(password, 6)

    return new User(name, username, hashPassword, confirmPassword)
  }
}