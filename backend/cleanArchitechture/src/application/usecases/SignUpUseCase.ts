import AuthRepository from "../repositories/AuthRepository"

export default class SignUpUseCase {
    constructor(readonly authRepository: AuthRepository) {
        
    }

    async execute(request: any, response: any) { 
        const { name, username, password, confirmPassword } = request.body

        const user = await this.authRepository.getUserByUsername(username)

        if (user) {
            return response.status(400).json({ error: 'Usuario já existe' })
        }

        const newUser = await this.authRepository.save({ name, username, password })

        return response.status(201).json(newUser)
    }
}