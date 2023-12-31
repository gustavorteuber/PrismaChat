import bcrypt from 'bcrypt'
import { IHash } from './IHash'

export class BcryptAdapter implements IHash {
  constructor(private readonly salt: number) {}

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }

  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}