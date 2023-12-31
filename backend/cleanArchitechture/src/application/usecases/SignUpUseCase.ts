import { IUserRepository } from "../repositories/ChatRepository"

export default class SignUpUseCase {
    constructor(readonly userRepository: IUserRepository) {
        
    }

    async execute(request: any, response: any) {
        const { name, username, password, confirmPassword } = request.body

        const user = await this.userRepository.getUserByUsername(username)

        if (user) {
            return response.status(400).json({ error: 'Usuario já existe' })
        }

        const newUser = await this.userRepository.save({ name, username, password })

        return response.status(201).json(newUser)
    }
}