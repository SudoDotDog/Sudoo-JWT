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

describe('Given {JWTToken} class', (): void => {

    const chance: Chance.Chance = new Chance('jwt-token');

    let keyPair: MockKeyPairGenerator;
    let token: string;

    before(() => {
        keyPair = MockKeyPairGenerator.getInstance();

        const creator: JWTCreator = JWTCreator.instantiate(keyPair.singleLinePrivate);
        const header = {
            foo: chance.string(),
        };
        const body = {
            bar: chance.string(),
        };

        token = creator.create(header, body);
    });

    it('should be able to construct', (): void => {

        const creator: JWTToken | null = JWTToken.instantiateWithoutVerify(token);

        expect(creator).to.be.instanceOf(JWTToken);
    });
});
