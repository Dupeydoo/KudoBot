import crypto = require('crypto');
import { promisify } from 'util';

export const randomBytes = promisify(crypto.randomBytes);

export class Hasher {
    private hash: crypto.Hash;
    private readonly HashAlgorithm = 'blake2s256';
    private readonly Digest = 'hex';

    constructor(private rawString: string) {
        this.hash = crypto.createHash(this.HashAlgorithm);
    }

    generateHash = async () : Promise<string> => {
        return this.hash.update(this.rawString).digest(this.Digest);
    }

    generateRandomSalt = async (saltLength : number) => {
        return (await randomBytes(saltLength)).toString(this.Digest);
    }
}