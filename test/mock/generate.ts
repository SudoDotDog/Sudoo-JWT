/**
 * @author WMXPY
 * @namespace JWT
 * @description Generate
 * @package Mock
 */

import { generateSingleLineKeyPair, KeyPair } from "@sudoo/token";

export class MockKeyPairGenerator {

    private static _instance?: MockKeyPairGenerator;

    public static getInstance(): MockKeyPairGenerator {

        if (!this._instance) {
            this._instance = new MockKeyPairGenerator();
            return this._instance;
        }
        return this._instance;
    }

    private readonly _privateKey: string;
    private readonly _publicKey: string;

    private constructor() {

        const keyPair: KeyPair = generateSingleLineKeyPair();

        this._privateKey = keyPair.private;
        this._publicKey = keyPair.public;
    }

    public get public(): string {
        return this._publicKey;
    }
    public get private(): string {
        return this._privateKey;
    }
}
