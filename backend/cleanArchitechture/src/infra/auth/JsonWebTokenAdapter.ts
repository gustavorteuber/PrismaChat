import jwt from 'jsonwebtoken'
import { IJwt } from './IJwt'

export default class JsonWebTokenAdapter implements IJwt{
    constructor(private readonly secret: string) {}
    
        async sign(payload: any): Promise<any> {
            return await jwt.sign(payload, this.secret)
        }
    
        async verify(token: string): Promise<any> {
            return await jwt.verify(token, this.secret)
        }

}