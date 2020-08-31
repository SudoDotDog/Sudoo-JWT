/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 */

export class JWTCreator {

    public static create(privateKey: string): JWTCreator {

        return new JWTCreator(privateKey);
    }

    private readonly _privateKey: string;

    private constructor(privateKey: string) {

        this._privateKey = privateKey;
    }
}
