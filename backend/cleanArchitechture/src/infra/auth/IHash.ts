export interface IHash {
    compare: (plaintext: string, digest: string) => Promise<boolean>;
    hash: (plaintext: string) => Promise<string>;
}