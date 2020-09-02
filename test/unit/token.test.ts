/**
 * @author WMXPY
 * @namespace JWT
 * @description Token
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { JWTCreator } from '../../src';
import { JWTToken } from '../../src/token';
import { MockKeyPairGenerator } from '../mock/generate';
import { KeyPair, generateKeyPair } from '@sudoo/token';

describe('Given {JWTToken} class', (): void => {

    const chance: Chance.Chance = new Chance('jwt-token');

    let keyPair: MockKeyPairGenerator;
    let mockToken: string;

    before(() => {
        keyPair = MockKeyPairGenerator.getInstance();

        const creator: JWTCreator = JWTCreator.instantiate(keyPair.singleLinePrivate);

        mockToken = creator.create({

            header: {
                foo: chance.string(),
            },
            body: {
                bar: chance.string(),
            },
        });
    });

    it('should be able to construct', (): void => {

        const token: JWTToken | null = JWTToken.instantiateWithoutVerify(mockToken);

        expect(token).to.be.instanceOf(JWTToken);
    });

    it('should be able to verify', (): void => {

        const token: JWTToken | null = JWTToken.instantiateWithLocalVerify(mockToken, keyPair.multiLinePublic);

        expect(token).to.be.instanceOf(JWTToken);
    });

    it('should be able to reject if verify failed', (): void => {

        const fakeKeyPair: KeyPair = generateKeyPair();
        const token: JWTToken | null = JWTToken.instantiateWithLocalVerify(mockToken, fakeKeyPair.public);

        expect(token).to.be.not.instanceOf(JWTToken);
        expect(token).to.be.equal(null);
    });
});
