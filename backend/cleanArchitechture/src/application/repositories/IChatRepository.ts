import User from '../../domain/User'

export interface IUserRepository {
  save(user: User): Promise<User>
  getUserByUsername(username: string): Promise<User | undefined>
}