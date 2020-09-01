/**
 * @author WMXPY
 * @namespace JWT
 * @description Generate
 * @package Mock
 */

import { convertKeyPairToSingleLine, generateKeyPair, KeyPair } from "@sudoo/token";

export class MockKeyPairGenerator {

    private static _instance?: MockKeyPairGenerator;

    public static getInstance(): MockKeyPairGenerator {

        if (!this._instance) {
            this._instance = new MockKeyPairGenerator();
            return this._instance;
        }
        return this._instance;
    }

    private readonly _multiLinePrivateKey: string;
    private readonly _multiLineLinePublicKey: string;

    private readonly _singleLinePrivateKey: string;
    private readonly _singleLineLinePublicKey: string;

    private constructor() {

        const keyPair: KeyPair = generateKeyPair();

        this._multiLinePrivateKey = keyPair.private;
        this._multiLineLinePublicKey = keyPair.public;

        const singleLineKeyPair: KeyPair = convertKeyPairToSingleLine(keyPair);

        this._singleLinePrivateKey = singleLineKeyPair.private;
        this._singleLineLinePublicKey = singleLineKeyPair.public;
    }

    public get singleLinePublic(): string {
        return this._singleLineLinePublicKey;
    }
    public get singleLinePrivate(): string {
        return this._singleLinePrivateKey;
    }

    public get multiLinePublic(): string {
        return this._multiLineLinePublicKey;
    }
    public get multiLinePrivate(): string {
        return this._multiLinePrivateKey;
    }
}
