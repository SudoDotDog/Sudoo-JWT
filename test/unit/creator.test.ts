/**
 * @author WMXPY
 * @namespace JWT
 * @description Creator
 * @package Unit Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { JWTCreator } from '../../src';
import { MockKeyPairGenerator } from '../mock/generate';

describe('Given {JWTCreator} class', (): void => {

    const chance: Chance.Chance = new Chance('jwt-creator');

    let keyPair: MockKeyPairGenerator;

    before(() => {
        keyPair = MockKeyPairGenerator.getInstance();
    });

    it('should be able to construct', (): void => {

        const creator: JWTCreator = JWTCreator.create(keyPair.private);

        expect(creator).to.be.instanceOf(JWTCreator);
    });

    it('should be able to create token', (): void => {

        const creator: JWTCreator = JWTCreator.create(keyPair.private);

        const header = {
            foo: chance.string(),
        };
        const body = {
            bar: chance.string(),
        };

        const token: string = creator.create(header, body);
        expect(typeof token).to.be.equal('string');

        console.log(keyPair.public);
        console.log(token);
    });
});
